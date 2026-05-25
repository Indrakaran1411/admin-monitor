# Admin Monitor — Full Stack App

## What this app does
- Employees chat with clients in real time
- Admin sees all messages live
- AI agent answers admin questions about activity
- Auto-detects flagged/urgent messages
- Suggests follow-up actions

---

## Setup (Mac)

### Step 1 — Install MongoDB (free, local)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```
> If you don't have Homebrew: https://brew.sh

### Step 2 — Install backend dependencies
```bash
cd admin-monitor/backend
npm install
```

### Step 3 — Create demo accounts
```bash
node seed.js
```
This creates:
- Admin: admin@company.com / admin123
- Employees: karan@company.com, priya@company.com, arjun@company.com (all password: emp123)

### Step 4 — Start the backend server
```bash
npm run dev
# Server runs at http://localhost:5000
```

### Step 5 — Open the apps
Open two browser tabs (or windows):

**Employee Chat:**
Open file: `frontend/employee/public/index.html`
- Login as karan@company.com / emp123
- Enter a client name (e.g. "Rahul - TechCorp")
- Start sending messages

**Admin Dashboard:**
Open file: `frontend/admin/public/index.html`
- Login as admin@company.com / admin123
- See live messages, alerts, AI agent

---

## How to test
1. Open employee app → login → type client name → send messages
2. Open admin app → watch Live Feed update in real time
3. Send a message with words like "urgent", "not working", "complaint" → see alert appear
4. Go to AI Agent tab → ask "Any flagged messages?" or "Show me summary"

---

## Folder structure
```
admin-monitor/
  backend/
    server.js        ← Express + Socket.io server
    seed.js          ← Creates demo accounts
    models/
      User.js        ← User schema
      Message.js     ← Message schema (with auto-flag)
    routes/
      auth.js        ← Login / register
      messages.js    ← Get messages, summaries
      users.js       ← Get employees
    middleware/
      auth.js        ← JWT check
  frontend/
    employee/
      public/index.html  ← Employee chat app
    admin/
      public/index.html  ← Admin monitor + AI agent
```

---

## Next steps (Phase 4)
- Add email integration alongside chat
- Add date-range filtering in admin
- Export daily reports as PDF
- Deploy to a server (Railway / Render — free)
