import os
import sys
import time
import subprocess
import requests

# Constants
MAX_FILE_SIZE_MB = 5
EXCLUDED_EXTENSIONS = {'.abc', '.exr', '.mov'}

# Environment Settings
def load_env_file(filepath=".env.local"):
    if os.path.exists(filepath):
        print(f"Loading environment from {filepath}...")
        with open(filepath, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    key, value = line.split("=", 1)
                    os.environ[key.strip()] = value.strip()

load_env_file() # Load local secrets

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
AUTHORIZED_USER_ID = os.getenv("AUTHORIZED_USER_ID")

def send_telegram_message(chat_id, text):
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    payload = {"chat_id": chat_id, "text": text}
    try:
        requests.post(url, json=payload)
    except Exception as e:
        print(f"Error sending message: {e}")

def check_safety_filters(file_paths):
    for path in file_paths:
        if not os.path.exists(path):
            continue
        
        # Extension check
        ext = os.path.splitext(path)[1].lower()
        if ext in EXCLUDED_EXTENSIONS:
            return False, f"Rule Violation: Cannot modify {ext} files ({path})"
            
        # Size check
        size_mb = os.path.getsize(path) / (1024 * 1024)
        if size_mb > MAX_FILE_SIZE_MB:
            return False, f"Rule Violation: File {path} exceeds 5MB limit"
            
    return True, "Safe"

def run_workspace_check():
    """Runs a local check to ensure no syntax errors."""
    print("Running local syntax check...")
    # Using npm run lint as a quick check
    result = subprocess.run(["npm", "run", "lint"], capture_output=True, text=True)
    return result.returncode == 0

def git_push_update():
    """Automates git add, commit, and push."""
    try:
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "Telegram Mobile Update"], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Git operation failed: {e}")
        return False

def poll_updates():
    if not TELEGRAM_TOKEN or not AUTHORIZED_USER_ID:
        print("Error: TELEGRAM_TOKEN or AUTHORIZED_USER_ID not set.")
        sys.exit(1)

    print(f"Starting Telegram Bridge Listener (Authorized User: {AUTHORIZED_USER_ID})...")
    offset = 0
    
    while True:
        try:
            url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/getUpdates?offset={offset}&timeout=30"
            response = requests.get(url).json()
            
            if not response.get("ok"):
                print(f"API Error: {response}")
                time.sleep(5)
                continue

            for update in response.get("result", []):
                offset = update["update_id"] + 1
                message = update.get("message", {})
                user_id = str(message.get("from", {}).get("id"))
                text = message.get("text", "")

                if user_id != AUTHORIZED_USER_ID:
                    print(f"Ignoring message from unauthorized user: {user_id}")
                    continue

                print(f"Received authorized request: {text}")

                # Placeholder for request analysis and file modification
                # In a real scenario, this would trigger an agentic loop or a specific script
                send_telegram_message(user_id, "Processing your request... ⚙️")
                
                # Logic to determine changed files would go here
                # Simulation of a successful update:
                if run_workspace_check():
                    if git_push_update():
                        send_telegram_message(user_id, "✅ Deployment triggered! Vercel is building your changes.")
                    else:
                        send_telegram_message(user_id, "❌ Git push failed. Please check logs.")
                else:
                    send_telegram_message(user_id, "❌ Workspace check failed (syntax errors detected).")

        except Exception as e:
            print(f"Polling error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    poll_updates()
