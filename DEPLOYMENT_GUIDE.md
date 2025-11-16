# Hope Clinic - Deployment & Setup Guide

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18+ 
- Yarn package manager
- Git

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd HopeClinic-MentalHealth
yarn install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
cd server
cp .env.example .env
```

**Required Configuration:**
```env
# Database
DATABASE_URL=file:./dev.db

# JWT Secrets (Generate secure keys for production)
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

# OpenAI API (for AI Chat)
OPENAI_API_KEY=sk-your-openai-api-key

# Google OAuth (Optional but Recommended)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# EmailJS (for appointment confirmations & inquiry replies)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
EMAILJS_PRIVATE_KEY=your_private_key
```

#### Frontend (.env)
```bash
cd ../client
cp .env.example .env
```

**Required Configuration:**
```env
# API URL
VITE_API_URL=http://localhost:8001/api

# Google OAuth (must match backend)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# EmailJS (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Database Setup

```bash
cd server

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database with sample data
npx ts-node src/scripts/seed-enhanced.ts
```

### 4. Start Development Servers

**Option 1: Run both servers (from root)**
```bash
yarn dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
cd server
yarn dev
```

Terminal 2 (Frontend):
```bash
cd client
yarn dev
```

### 5. Access Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001/api
- **Prisma Studio:** `cd server && npx prisma studio`

---

## 👥 Default Login Credentials

After seeding, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@hopeclinic.com | password123 |
| Doctor | dr.bharat@hopeclinic.com | password123 |
| Patient | patient1@example.com | password123 |

---

## 🔑 API Key Setup Guide

### 1. OpenAI API Key (Required for AI Chat)

1. Visit: https://platform.openai.com/api-keys
2. Sign up/Login
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Add to `server/.env`: `OPENAI_API_KEY=sk-your-key-here`

**Cost:** GPT-4o is ~$2.50 per 1M input tokens, $10 per 1M output tokens

### 2. Google OAuth Setup (Optional)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create new project or select existing
3. Click "Create Credentials" → "OAuth 2.0 Client ID"
4. Configure consent screen
5. Application type: "Web application"
6. Add Authorized JavaScript origins:
   - `http://localhost:3000`
   - Your production domain
7. Add Authorized redirect URIs:
   - `http://localhost:8001/api/auth/google/callback`
   - Your production callback URL
8. Copy Client ID and Client Secret
9. Add to both `.env` files

### 3. EmailJS Setup (Optional)

1. Visit: https://www.emailjs.com/
2. Sign up for free account
3. Add email service (Gmail, Outlook, etc.)
4. Create email template:
   - Use variables: `{{to_name}}`, `{{subject}}`, `{{message}}`
5. Get credentials from dashboard:
   - Service ID
   - Template ID
   - Public Key
   - Private Key (from Account page)
6. Add to both `.env` files

**Free Tier:** 200 emails/month

---

## 🏗️ Architecture

### Tech Stack
- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express + TypeScript
- **Database:** SQLite + Prisma ORM
- **Auth:** JWT with refresh tokens
- **AI:** OpenAI GPT-4o
- **Email:** EmailJS
- **PWA:** Service Workers + Web App Manifest

### Project Structure
```
HopeClinic-MentalHealth/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   ├── layouts/       # Layout wrappers
│   │   ├── store/         # Zustand state management
│   │   └── lib/           # Utilities & API
│   └── public/            # Static assets + PWA files
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middlewares/   # Auth, error handling
│   │   ├── utils/         # Helper functions
│   │   └── scripts/       # Database seeds
│   └── prisma/            # Database schema & migrations
└── INSTALLATION.md         # Detailed setup guide
```

---

## ✨ Features Implemented

### Patient Features
- ✅ AI-powered mental health chat (GPT-4o)
- ✅ Online & offline appointment booking
- ✅ Personal dashboard with analytics
- ✅ Appointment history
- ✅ Profile management with password change
- ✅ Google OAuth login

### Admin Features
- ✅ Comprehensive dashboard
- ✅ Appointment management (approve/reject)
- ✅ Blog CMS (Create, Read, Update, Delete)
- ✅ Testimonial management with approval
- ✅ Inquiry handling with email replies
- ✅ User management
- ✅ System settings
- ✅ Email notifications via EmailJS

### Public Features
- ✅ 10 therapy programs with detail pages
- ✅ 20+ mental health blog articles
- ✅ Testimonials with interactive slider
- ✅ Contact form with email integration
- ✅ Dark mode support
- ✅ PWA with install prompt
- ✅ Fully responsive design
- ✅ SEO optimized

---

## 🧪 Testing

### Manual Testing
```bash
# Test login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient1@example.com","password":"password123"}'

# Test programs endpoint
curl http://localhost:8001/api/programs

# Test blogs endpoint
curl http://localhost:8001/api/blogs
```

### Database Inspection
```bash
cd server
npx prisma studio
# Opens GUI at http://localhost:5555
```

---

## 🚀 Production Deployment

### Environment Variables (Production)

**CRITICAL CHANGES:**
1. Generate strong JWT secrets:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

2. Update URLs to production domains
3. Use environment variable injection (not .env files)
4. Enable HTTPS
5. Configure CORS for production domain

### Build Commands

```bash
# Build frontend
cd client
yarn build
# Output: client/dist/

# Build backend
cd server
yarn build
# Output: server/dist/
```

### Deployment Options

1. **Traditional VPS** - See INSTALLATION.md for nginx + PM2 setup
2. **Vercel** (Frontend) + **Railway/Render** (Backend)
3. **Docker** - Create Dockerfile for containerized deployment
4. **Cloud Platforms** - AWS, Google Cloud, Azure

---

## 📊 Database Management

### Migrations
```bash
cd server

# Create new migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Seeding
```bash
# Seed with sample data
npx ts-node src/scripts/seed-enhanced.ts

# Custom seed
npx ts-node src/scripts/seed.ts
```

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 8001
lsof -ti:8001 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Database Issues
```bash
# Regenerate Prisma client
cd server
npx prisma generate

# View database
npx prisma studio
```

### Google OAuth Not Working
1. Check Client ID matches in both .env files
2. Verify redirect URIs in Google Console
3. Ensure JavaScript origins are whitelisted
4. Clear browser cache and cookies

### AI Chat Errors
1. Verify OpenAI API key is valid
2. Check API key has credits
3. Ensure model is set to 'gpt-4o' or 'gpt-3.5-turbo'
4. Check backend logs for detailed errors

### Email Not Sending
1. Verify EmailJS credentials in .env
2. Test in EmailJS dashboard first
3. Check template variables match
4. Ensure email service is active

---

## 📝 Scripts Reference

### Root Level
```bash
yarn dev              # Start both servers
yarn build            # Build both projects
yarn prisma:migrate   # Run database migrations
yarn prisma:studio    # Open Prisma Studio
yarn seed             # Seed database
```

### Server
```bash
yarn dev              # Start dev server with ts-node
yarn build            # Compile TypeScript
yarn start            # Run compiled code
yarn prisma:generate  # Generate Prisma client
```

### Client
```bash
yarn dev              # Start Vite dev server
yarn build            # Build for production
yarn preview          # Preview production build
```

---

## 🔒 Security Checklist

- [ ] Strong JWT secrets in production
- [ ] Environment variables not committed
- [ ] HTTPS enabled
- [ ] CORS configured for production domains
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (Prisma handles this)
- [ ] XSS protection
- [ ] Password hashing with bcrypt
- [ ] Refresh token rotation

---

## 📞 Support

For issues or questions:
- Email: admin@hopeclinic.com
- GitHub Issues: [Create issue](your-repo-url/issues)

---

**Built with ❤️ for Mental Wellness**
