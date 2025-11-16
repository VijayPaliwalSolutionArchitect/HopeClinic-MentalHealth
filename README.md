# Hope Clinic - Mental Health PWA Platform

> Professional mental health services with AI-powered chat, appointment booking, and comprehensive admin management.

## 🚀 Quick Start

### For Local Development (Windows/Mac/Linux)

1. **Clone & Install**
```bash
git clone <repo-url>
cd hope-clinic
yarn install
cd server && yarn install
cd ../client && yarn install
cd ..
```

2. **Setup Environment**
```bash
# Copy .env.example to .env in both server and client folders
cp server/.env.example server/.env
cp client/.env.example client/.env
# Edit and add your API keys
```

3. **Initialize Database**
```bash
cd server
npx prisma generate
npx prisma migrate dev
npx ts-node src/scripts/seed-enhanced.ts
cd ..
```

4. **Start Development**
```bash
yarn dev
# Or run separately:
# Terminal 1: cd server && yarn dev
# Terminal 2: cd client && yarn dev
```

5. **Access App**
- Frontend: http://localhost:3000
- Backend: http://localhost:8001

## 📝 Default Credentials
- Admin: admin@hopeclinic.com / password123
- Doctor: dr.bharat@hopeclinic.com / password123
- Patient: patient1@example.com / password123

## 🎯 Features

### Patient Features
- AI-powered mental health chat (OpenAI GPT-4o)
- Online & offline appointment booking
- Personal dashboard with analytics
- Chat history and reports
- Profile management

### Admin Features
- Comprehensive analytics dashboard
- Appointment management (approve/reject)
- Blog CMS with CRUD operations
- Testimonial management
- Inquiry handling with email replies
- User management
- System settings

### Public Features
- 10 therapy programs with detail pages
- 20 mental health blog articles
- Testimonials with interactive slider
- Contact form
- Dark mode support
- PWA with install prompt
- Fully responsive design

## 🛠 Tech Stack

**Frontend:**
- React 18 + Vite
- Tailwind CSS 3.4
- Framer Motion
- React Router v6
- Zustand (State Management)
- React Query
- Axios

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite Database
- JWT Authentication
- OpenAI Integration

## 📦 Project Structure
```
hope-clinic/
├── client/          # React frontend
│   ├── src/
│   │   ├── pages/   # All page components
│   │   ├── components/  # Reusable components
│   │   ├── layouts/ # Layout components
│   │   ├── store/   # State management
│   │   └── lib/     # Utilities & API
│   └── public/      # Static assets
├── server/          # Express backend
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Route handlers
│   │   ├── services/    # Business logic
│   │   ├── middlewares/ # Auth, error handling
│   │   └── utils/       # Helper functions
│   └── prisma/      # Database schema
└── INSTALLATION.md  # Detailed deployment guide
```

## 🔧 Available Scripts

```bash
yarn dev              # Start both servers
yarn build            # Build for production
yarn prisma:migrate   # Run database migrations
yarn prisma:studio    # Open Prisma Studio
yarn seed             # Seed database
```

## 🌐 Deployment

See [INSTALLATION.md](./INSTALLATION.md) for detailed deployment instructions for:
- Local development (Windows/Mac/Linux)
- Production VPS deployment
- Nginx configuration
- SSL setup
- PM2 process management

## 📧 Environment Variables

### Server (.env)
```env
DATABASE_URL=file:./dev.db
JWT_SECRET=your-secret
OPENAI_API_KEY=your-openai-key
EMAILJS_SERVICE_ID=your-emailjs-service
```

### Client (.env)
```env
VITE_API_URL=http://localhost:8001/api
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

## 🎨 UI/UX Features
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations (Framer Motion)
- Interactive hover effects
- Dark mode support
- Mobile-first responsive
- PWA installable

## 🔒 Security
- JWT authentication with refresh tokens
- Password hashing (bcrypt)
- Protected routes
- CORS configuration
- Input validation
- XSS protection

## 📱 PWA Features
- Offline support
- Install to device
- App-like experience
- Push notifications ready

## 🤝 Support
For issues or questions: admin@hopeclinic.com

---

**Built with ❤️ for Mental Wellness**