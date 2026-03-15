const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Constants
const MAX_FILE_SIZE_MB = 5;
const EXCLUDED_EXTENSIONS = ['.abc', '.exr', '.mov'];

// Load environment variables from .env.local manually
function loadEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        console.log(`Loading environment from ${envPath}...`);
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#')) {
                const [key, ...valueParts] = trimmed.split('=');
                if (key && valueParts.length > 0) {
                    process.env[key.trim()] = valueParts.join('=').trim();
                }
            }
        });
    }
}

loadEnv();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const AUTHORIZED_USER_ID = process.env.AUTHORIZED_USER_ID;

if (!TELEGRAM_TOKEN || !AUTHORIZED_USER_ID) {
    console.error("Error: TELEGRAM_TOKEN or AUTHORIZED_USER_ID not set in .env.local");
    process.exit(1);
}

const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function sendTelegramMessage(chatId, text) {
    try {
        await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

function runWorkspaceCheck() {
    console.log("Running local syntax check (npm run lint)...");
    try {
        // Use npm.cmd for Windows compatibility to avoid script execution policy issues
        const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        execSync(`${npmCmd} run lint`, { stdio: 'inherit' });
        return true;
    } catch (e) {
        return false;
    }
}

function gitPushUpdate() {
    try {
        console.log("Committing and pushing changes...");
        execSync("git add .", { stdio: 'inherit' });
        execSync('git commit -m "Telegram Mobile Update"', { stdio: 'inherit' });
        execSync("git push origin main", { stdio: 'inherit' });
        return true;
    } catch (e) {
        console.error("Git operation failed:", e.message);
        return false;
    }
}

async function startPolling() {
    console.log(`Starting Telegram Bridge Listener (Authorized User: ${AUTHORIZED_USER_ID})...`);
    let offset = 0;

    while (true) {
        try {
            const response = await fetch(`${TELEGRAM_API_URL}/getUpdates?offset=${offset}&timeout=30`);
            const data = await response.json();

            if (!data.ok) {
                console.error("Telegram API reported an error:", data);
                await new Promise(r => setTimeout(r, 5000));
                continue;
            }

            for (const update of data.result) {
                offset = update.update_id + 1;
                const message = update.message;
                if (!message) continue;

                const userId = String(message.from.id);
                const text = message.text;

                if (userId !== AUTHORIZED_USER_ID) {
                    console.log(`Ignoring message from unauthorized user: ${userId}`);
                    continue;
                }

                console.log(`Received authorized request: ${text}`);
                await sendTelegramMessage(userId, "Processing your request... ⚙️");

                // In a real scenario, this is where the agent would pick up the work.
                // For now, we simulate the deployment flow.
                if (runWorkspaceCheck()) {
                    if (gitPushUpdate()) {
                        await sendTelegramMessage(userId, "✅ Deployment triggered! Vercel is building your changes.");
                    } else {
                        await sendTelegramMessage(userId, "❌ Git push failed. Check console for errors.");
                    }
                } else {
                    await sendTelegramMessage(userId, "❌ Workspace check failed (npm run lint reported errors).");
                }
            }
        } catch (error) {
            console.error("Polling error:", error);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
}

startPolling();
