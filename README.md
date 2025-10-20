# ReachInbox Assignment — Full Stack (TypeScript)

This repository is a submission scaffold for the ReachInbox Backend Engineering assignment.
It demonstrates:
- Real-time IMAP synchronization (IDLE)
- Email storage & search using Elasticsearch
- AI-based email categorization (OpenAI)
- Slack & Webhook notifications
- Simple React frontend to view/search emails
- (Bonus) RAG-based suggested replies endpoint

## Quickstart

### 1. Backend
```bash
cd backend
cp .env.example .env      # fill in IMAP creds, OpenAI key, Slack webhook, webhook.site url
docker-compose up -d      # starts Elasticsearch
npm install
npm run start

