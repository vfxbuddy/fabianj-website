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
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;

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

async function checkVercelDeployment() {
    if (!VERCEL_TOKEN || !VERCEL_PROJECT_ID) return null;
    try {
        const response = await fetch(`https://api.vercel.com/v6/deployments?projectId=${VERCEL_PROJECT_ID}&limit=1`, {
            headers: { Authorization: `Bearer ${VERCEL_TOKEN}` }
        });
        const data = await response.json();
        return data.deployments && data.deployments[0];
    } catch (error) {
        console.error("Error checking Vercel:", error);
        return null;
    }
}

async function watchVercelDeployment(chatId) {
    console.log("Monitoring Vercel deployment...");
    const startTime = Date.now();
    let lastUrl = "";

    // Poll every 10 seconds for up to 5 minutes
    while (Date.now() - startTime < 5 * 60 * 1000) {
        const deploy = await checkVercelDeployment();
        if (deploy) {
            lastUrl = `https://${deploy.url}`;
            if (deploy.readyState === 'READY') {
                await sendTelegramMessage(chatId, `✅ LIVE! Your changes are now public at: ${lastUrl}`);
                return;
            } else if (deploy.readyState === 'ERROR') {
                await sendTelegramMessage(chatId, `❌ Vercel build failed. Check your Vercel dashboard for logs.`);
                return;
            }
        }
        await new Promise(r => setTimeout(r, 10000));
    }
    await sendTelegramMessage(chatId, "⚠️ Vercel is taking a while to build. Check back in a minute!");
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
        console.log("Checking for changes...");
        const status = execSync("git status --porcelain").toString().trim();
        
        if (!status) {
            console.log("No changes detected to push.");
            return "no_changes";
        }

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
                if (text.startsWith('/deploy') || text.startsWith('/push')) {
                    await sendTelegramMessage(userId, "Starting deployment workflow... ⚙️");
                    if (runWorkspaceCheck()) {
                        const result = gitPushUpdate();
                        if (result === true) {
                            await sendTelegramMessage(userId, "🚀 Code pushed to GitHub. Watching Vercel for build completion...");
                            watchVercelDeployment(userId); // Start monitoring in background
                        } else if (result === "no_changes") {
                            await sendTelegramMessage(userId, "ℹ️ No changes detected to deploy.");
                        } else {
                            await sendTelegramMessage(userId, "❌ Git push failed. Check console for errors.");
                        }
                    } else {
                        await sendTelegramMessage(userId, "❌ Workspace check failed (npm run lint reported errors).");
                    }
                } else {
                    // Just acknowledge the relay for normal messages
                    await sendTelegramMessage(userId, "Relayed to Antigravity 🧠... I'm looking into it now.");
                }
            }
        } catch (error) {
            console.error("Polling error:", error);
            await new Promise(r => setTimeout(r, 5000));
        }
    }
}

startPolling();
