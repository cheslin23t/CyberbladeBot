# Cyberblade Bot

Cyberblade Bot is an archived Discord bot I built in 2022 while learning how to structure a larger event-driven Node.js project. It followed my earlier Discord experiments and moved toward slash commands, reusable command registration, interactive components, and database-backed server configuration.

## What is in the snapshot

- Dynamically loaded command and event modules
- Discord slash-command registration
- Moderation commands for actions such as bans and kicks
- Button-based polls with persisted poll data
- MongoDB models for server configuration, polls, and administrative ranks
- Rank, permission, welcome-message, and redemption experiments
- Early Top.gg webhook and bot-list integration work

## Why it is public

I am publishing this repository as a historical learning project. It shows the progression from small command bots toward a more modular system with database-backed behavior and interactive Discord features. The code is preserved substantially as it was written so that progression is visible.

## Important limitations

This is not a maintained or production-ready Discord bot. The repository does not include a complete dependency manifest or current setup instructions, and several implementation choices would need to be redesigned before deployment. In particular, the archived source includes an owner-level `eval` command, hard-coded identifiers and redemption experiments, and permission paths that have not been security-audited.

Do not connect this snapshot to a live bot token or production Discord server. Treat it as a code archive rather than deployable software.

