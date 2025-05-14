# 🎯 GoalSync – Visual Goal Planner & Progress Tracker

**GoalSync** is a minimalist, AI-augmented web application designed to help individuals break down career or learning goals into manageable objectives and track their progress using a Kanban-style board. It's ideal for self-learners, productivity hackers, and anyone who prefers visual goal planning.

---

## 🚀 Features

- 📝 Input your main goal (e.g., “Become a Full-Stack Developer”)
- 🧩 Automatically generated sub-goals/objectives using AI logic
- 🗂️ Organize tasks across Kanban columns: To Do, In Progress, Completed
- ✅ Mark objectives as complete and track progress in real-time
- 📂 View completed goals on a separate summary page
- 📦 Component-based modular design (easily extendable)

---

## 🛠 Tech Stack

- **Frontend**: React.js, Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI Logic**: Local generation logic using custom TypeScript modules
- **Deployment**: Vercel

---

## 🧪 Demo

> Try the live app here: 

---

## 📝 Getting Started (Local Setup)

1. Clone this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/goalsync.git
   cd goalsync

2. Install dependencies:
    npm install

3. Run locally:
    npm run dev

4. Open http://localhost:3000 in your browser.


⚠️ Data Persistence Notice
🚫 This project does not use a backend or database currently.

All data is stored locally in memory, so:

Refreshing the page will reset your goals

Opening the app in another browser/device won’t retain your progress

✅ To make it fully functional with user persistence, you can:

Connect a backend like Supabase or MongoDB.

Enable user authentication

Store goals in a database per user

Add Edge Functions or CRON jobs for smart reminders

📄 License
MIT License — free to use, modify, and distribute.

Author:
Manan Patel