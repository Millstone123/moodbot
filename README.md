# moodbot

A Discord bot that posts a daily standup mood poll to your server.
Team members react with emoji to share how they're feeling.
Results are summarized and posted 10 minutes before the scheduled meeting.

## Requirements

- Node.js 18+
- A Discord application with bot token

## Setup

1. Clone and configure:
```bash
cp .env.example .env
# Edit .env with your bot token and channel ID
```

2. Validate your environment before installing:
```bash
bash scripts/preflight.sh
```

3. Install and run:
```bash
npm install
node src/index.js
```

## Bot Commands

- `/mood set-time HH:MM` — Set when the poll posts
- `/mood set-channel` — Set the channel for polls
- `/mood test` — Post a test poll now

## License

MIT
