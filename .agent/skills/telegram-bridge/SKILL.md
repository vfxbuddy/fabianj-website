---
name: Telegram Mobile Bridge
description: Allows managing the workspace via a Telegram bot with safety filters and git automation.
---

# Telegram Mobile Bridge

This skill enables mobile management of the workspace through a Telegram bot. It monitors incoming messages from an authorized user and performs requested code modifications and deployments.

## Instructions

- **Long-Polling**: Connects to your Telegram bot using the `TELEGRAM_TOKEN`.
- **Connection**: Uses `node .agent/skills/telegram-bridge/scripts/listener.js`.
- **Authentication**: All requests MUST be authenticated against `AUTHORIZED_USER_ID`. Ignore all messages from other users.
- **Request Processing**:
    1. Receive message from Telegram.
    2. Analyze the request to determine necessary file changes.
    3. Modify relevant files in the workspace.
    4. Run a local syntax check (e.g., `npm run lint` or `npm run build`).
    5. Execute:
        ```bash
        git add .
        git commit -m "Telegram Mobile Update"
        git push origin main
        ```
- **Safety Filters**:
    - **Size**: Do NOT modify or push files larger than 5MB.
    - **Excluded Extensions**: Do NOT touch `.abc`, `.exr`, or `.mov` files.
    - **Destructive Actions**: If a change involves deleting files, the skill MUST ask for "CONFIRM" on Telegram before proceeding.
- **Confirmation**: After a successful push, message the user back on Telegram: "✅ Deployment triggered! Vercel is building your changes."

## Environment Variables
- `TELEGRAM_TOKEN`: The API token for your Telegram bot.
- `AUTHORIZED_USER_ID`: Your unique Telegram User ID to prevent unauthorized access.
