# 🚀 Hope Clinic - Complete Setup Guide

## ⚡ Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- npm (comes with Node.js)
- Terminal/Command Prompt

---

## 📦 Step 1: Install Dependencies (2 min)

```bash
# Navigate to project root
cd /path/to/HopeClinic-MentalHealth

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Go back to root
cd ..
```

**What this does:**
- Installs all frontend packages (React, Vite, Tailwind, etc.)
- Installs all backend packages (Express, Prisma, TypeScript, etc.)
- Sets up node_modules in both directories

---

## 🗄️ Step 2: Setup Database (2 min)

```bash
# Navigate to server directory
cd server

# Step 2a: Generate Prisma Client
npx prisma generate

# Step 2b: Run database migrations (creates dev.db file)
npx prisma migrate deploy

# Step 2c: Seed database with sample data
npx ts-node src/scripts/seed-enhanced.ts
```

**What happens:**
1. **prisma generate** - Creates TypeScript client for database operations
2. **prisma migrate deploy** - Creates SQLite database file (dev.db) with all tables
3. **seed script** - Adds sample data:
   - 3 users (admin, doctor, patient)
   - 10 therapy programs
   - 20 blog posts
   - 10 testimonials

**✅ Success Output:**
```
🌱 Starting enhanced database seeding...
✅ Created users
✅ Created 10 therapy programs
✅ Created 20 blog posts
✅ Created 10 testimonials
🎉 Enhanced database seeding completed!
```

---

## 🔐 Step 3: Environment Configuration (1 min)

```bash
# Navigate to server folder
cd server

# Copy example env file
cp .env.example .env

# Navigate to client folder
cd ../client

# Copy example env file
cp .env.example .env
```

**IMPORTANT:** Default `.env` files are already configured with working mock values!
- ✅ OpenAI API Key: Set to 'mock' (uses mock AI responses)
- ✅ Google OAuth: Set to 'placeholder' (button hidden)
- ✅ EmailJS: Set to 'placeholder' (logs to console)
- ✅ Database URL: Already set to `file:./dev.db`

**You can start the app immediately without changing anything!**

---

## 🚀 Step 4: Start the Application

### Option A: Start Both Servers Separately (Recommended)

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### Option B: Start Both Using Concurrently (if available)

```bash
# From project root (if concurrently is installed)
npm run dev
```

**✅ Success Output:**

Backend:
```
🚀 Hope Clinic Server running on port 8001
🌐 Client URL: http://localhost:3000
📊 Environment: development
```

Frontend:
```
VITE v5.4.21  ready in 125 ms
➜  Local:   http://localhost:3000/
```

---

## 🌐 Step 5: Access Application

Open your browser and go to:

**Frontend:** http://localhost:3000  
**Backend API:** http://localhost:8001/api

---

## 👤 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@hopeclinic.com | password123 |
| **Doctor** | dr.bharat@hopeclinic.com | password123 |
| **Patient** | patient1@example.com | password123 |

---

## 🔧 Troubleshooting

### Problem 1: "Environment variable not found: DATABASE_URL"

**Solution:**
```bash
# Make sure you're in the server directory
cd server

# Ensure .env file exists
ls -la .env

# If missing, copy from example
cp .env.example .env

# Verify DATABASE_URL is set
cat .env | grep DATABASE_URL
```

Should show: `DATABASE_URL=file:./dev.db`

---

### Problem 2: "Prisma Client not generated"

**Solution:**
```bash
cd server
npx prisma generate
```

---

### Problem 3: "Port 8001 already in use"

**Solution:**
```bash
# Kill process on port 8001
lsof -ti:8001 | xargs kill -9

# Restart backend
cd server && yarn dev
```

---

### Problem 4: "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Restart frontend
cd client && yarn dev
```

---

### Problem 5: Seeding fails with "unique constraint"

**Solution:**
```bash
# Reset database and reseed
cd server
rm dev.db
npx prisma migrate deploy
npx ts-node src/scripts/seed-enhanced.ts
```

---

## 📊 Database Management

### View Database (Prisma Studio)

```bash
cd server
npx prisma studio
```

Opens GUI at http://localhost:5555 to view/edit database

### Reset Database

```bash
cd server
rm dev.db
npx prisma migrate deploy
npx ts-node src/scripts/seed-enhanced.ts
```

### Create New Migration

```bash
cd server
npx prisma migrate dev --name your_migration_name
```

---

## 🔑 Adding Real API Keys (Optional)

### OpenAI API Key (for real AI Chat)

1. Get key from https://platform.openai.com/api-keys
2. Edit `server/.env`:
```env
OPENAI_API_KEY=sk-your-actual-key-here
```
3. Restart backend

### Google OAuth (for social login)

1. Get credentials from https://console.cloud.google.com/apis/credentials
2. Edit both `.env` files:

**server/.env:**
```env
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret
```

**client/.env:**
```env
VITE_GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
```
3. Restart both servers

### EmailJS (for real emails)

1. Get credentials from https://www.emailjs.com/
2. Edit both `.env` files:

**server/.env:**
```env
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

**client/.env:**
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```
3. Restart both servers

---

## 🎯 Understanding the Backend Startup Process

### What happens when you run `yarn dev`:

1. **Load Environment Variables**
   - Reads `server/.env` file
   - Makes variables available to Node.js process

2. **Initialize TypeScript**
   - `ts-node` compiles TypeScript on-the-fly
   - No build step needed in development

3. **Connect to Database**
   - Prisma Client reads `DATABASE_URL`
   - Connects to SQLite database file
   - If file doesn't exist, shows error

4. **Start Express Server**
   - Loads all route handlers
   - Sets up middleware (CORS, auth, etc.)
   - Listens on PORT 8001

5. **Ready for Requests**
   - API endpoints available at `/api/*`
   - Hot-reload enabled (changes auto-restart)

---

## 🔄 Common Commands Reference

### Development
```bash
yarn dev              # Start both servers
cd server && yarn dev # Start backend only
cd client && yarn dev # Start frontend only
```

### Database
```bash
cd server
npx prisma generate           # Generate Prisma client
npx prisma migrate deploy     # Run migrations
npx prisma studio             # Open database GUI
npx ts-node src/scripts/seed-enhanced.ts  # Seed data
```

### Build for Production
```bash
yarn build            # Build both
cd client && yarn build  # Build frontend only
cd server && yarn build  # Build backend only
```

### Linting
```bash
cd client && yarn lint   # Lint frontend
```

---

## 📁 Project Structure

```
HopeClinic-MentalHealth/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── lib/           # Utilities
│   │   └── store/         # State management
│   ├── .env               # Frontend env variables
│   └── package.json       # Frontend dependencies
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middlewares/   # Auth, errors
│   │   └── scripts/       # Database seeds
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── migrations/    # Database migrations
│   ├── .env               # Backend env variables
│   ├── dev.db             # SQLite database (generated)
│   └── package.json       # Backend dependencies
│
├── package.json            # Root package.json (workspaces)
├── yarn.lock               # Dependency lock file
└── COMPLETE_SETUP_GUIDE.md # This file
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend runs without errors on port 8001
- [ ] Frontend runs without errors on port 3000
- [ ] Can access http://localhost:3000 in browser
- [ ] Can login with default credentials
- [ ] Homepage loads with all sections
- [ ] Database has seeded data (check Prisma Studio)
- [ ] AI Chat works (uses mock responses)
- [ ] Google login button is hidden (placeholder mode)
- [ ] Emails log to console instead of sending

---

## 🎓 Learning the Stack

### Frontend (React + Vite)
- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **Zustand** - State management
- **React Query** - Data fetching

### Backend (Express + TypeScript)
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM (database toolkit)
- **SQLite** - Database (dev)
- **JWT** - Authentication
- **Bcrypt** - Password hashing

---

## 🆘 Still Having Issues?

1. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   ```

2. **Clear node_modules and reinstall:**
   ```bash
   rm -rf node_modules client/node_modules server/node_modules
   yarn install
   ```

3. **Check for port conflicts:**
   ```bash
   lsof -ti:3000,8001
   ```

4. **View logs:**
   - Backend logs show in terminal where you ran `yarn dev`
   - Frontend logs in browser console (F12)

5. **Reset everything:**
   ```bash
   # Delete database
   rm server/dev.db
   
   # Reinstall
   yarn install
   
   # Rebuild database
   cd server
   npx prisma generate
   npx prisma migrate deploy
   npx ts-node src/scripts/seed-enhanced.ts
   
   # Start
   cd ..
   yarn dev
   ```

---

## 🎉 Success!

If you can:
1. ✅ Access http://localhost:3000
2. ✅ See the homepage
3. ✅ Login with default credentials
4. ✅ Navigate through pages

**You're all set! The app is working perfectly!** 🚀

---

**Built with ❤️ for Mental Wellness**
