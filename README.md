# Admin Monitor — Full Stack App

## What this app does
- Employees chat with clients in real time
- Admin sees all messages live via a dashboard
- **Daily Scan** — pick any day and get an AI-generated consolidated context summary like:
  > *"Today, Karan discussed Enterprise tier pricing with Rahul - TechCorp. The client has a business need for a cost-efficient pricing model. Key points were proposing a 15% discount on a 2-year contract..."*
- Auto-detects and flags urgent/sensitive messages
- AI Agent answers admin questions about any employee or client

---

## ✅ Works on: Mac · Windows · Linux

The app is built on **Node.js + MongoDB + plain HTML** — no platform-specific dependencies in the code itself.

---

## Prerequisites (all platforms)

| Tool | Install from |
|------|-------------|
| Node.js (v18+) | https://nodejs.org |
| MongoDB Community | See platform instructions below |

---

## Step 1 — Install MongoDB

### 🍎 Mac
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```
> Don't have Homebrew? → https://brew.sh

### 🪟 Windows
1. Download the installer from https://www.mongodb.com/try/download/community
2. Run the `.msi` installer — choose **"Install as a Service"** (MongoDB will auto-start)
3. MongoDB runs automatically after install

### 🐧 Linux (Ubuntu/Debian)
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```
> For other distros: https://www.mongodb.com/docs/manual/administration/install-on-linux/

---

## Step 2 — Clone & install backend

```bash
git clone https://github.com/Indrakaran1411/admin-monitor.git
cd admin-monitor/backend
npm install
```

---

## Step 3 — Create your `.env` file

Create a file called `.env` inside the `backend/` folder:

```
PORT=5050
MONGO_URI=mongodb://localhost:27017/adminmonitor
JWT_SECRET=your_super_secret_key_change_this
```

> ⚠️ `.env` is not included in the repo (it's gitignored). You must create it manually.

> **Mac users only:** Port 5000 is blocked by macOS AirPlay Receiver. Use `PORT=5050` as shown above.
> **Windows/Linux users:** You can use `PORT=5000` if you prefer.

---

## Step 4 — Seed the database (demo accounts + historical data)

```bash
node seed.js
```

This creates:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@company.com | admin123 |
| Employee | karan@company.com | emp123 |
| Employee | priya@company.com | emp123 |
| Employee | arjun@company.com | emp123 |

It also seeds 3 days of realistic chat history for testing the Daily Scan feature.

---

## Step 5 — Start the backend server

```bash
npm start
# Server runs at http://localhost:5050
```

---

## Step 6 — Open the apps in your browser

Open these two HTML files directly in your browser (no extra server needed):

**Employee Chat:**
```
frontend/employee/public/index.html
```
- Login as `karan@company.com` / `emp123`
- Enter a client name (e.g. `Rahul - TechCorp`)
- Start sending messages

**Admin Dashboard:**
```
frontend/admin/public/index.html
```
- Login as `admin@company.com` / `admin123`
- See live messages, alerts, AI Agent, and **Daily Scan**

---

## How to test

1. Open **Employee** app → login → set client name → send messages
2. Open **Admin** app → watch **Live Feed** update in real time
3. Send a message containing words like `urgent`, `refund`, `not working` → see it appear in **Alerts** tab
4. Go to **AI Agent** tab → ask *"Any flagged messages?"* or *"Show me a summary of today"*
5. Go to **📅 Daily Scan** tab → pick any date → click **Scan & Summarize** → get a consolidated executive summary per employee-client conversation

---

## Folder structure

```
admin-monitor/
  backend/
    server.js         ← Express + Socket.io server
    seed.js           ← Creates demo accounts & historical data
    .env              ← YOU create this (not in repo)
    models/
      User.js         ← User schema
      Message.js      ← Message schema (auto-flags urgent keywords)
    routes/
      auth.js         ← Login / register endpoints
      messages.js     ← Get messages, /scan endpoint
      users.js        ← Get employees list
    middleware/
      auth.js         ← JWT verification
  frontend/
    employee/
      public/index.html   ← Employee chat app
    admin/
      public/index.html   ← Admin dashboard (Live Feed, Alerts, AI Agent, Daily Scan)
```

---

## Port reference

| Platform | Recommended PORT | Reason |
|----------|-----------------|--------|
| Mac | 5050 | Port 5000 used by AirPlay Receiver |
| Windows | 5000 or 5050 | Either works |
| Linux | 5000 or 5050 | Either works |

If you change the port in `.env`, also update the `const API = 'http://localhost:XXXX'` line at the top of both HTML files.

---

## Roadmap
- [ ] Deploy to cloud (Railway / Render — free tier)
- [ ] Export Daily Scan reports as PDF
- [ ] Date-range scanning (week/month summaries)
- [ ] Email integration alongside chat
