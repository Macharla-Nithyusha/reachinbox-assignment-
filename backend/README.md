# 📡 ReachInbox Backend

This backend provides:
- Real-time IMAP email sync  
- Elasticsearch storage & search  
- AI categorization using OpenAI  
- Slack + webhook notifications  
- Suggested replies (RAG mode)

## ⚙️ Setup

```bash
cd backend
cp .env.example .env
npm install
docker-compose up -d
npm run dev

