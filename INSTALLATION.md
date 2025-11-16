# Hope Clinic - Installation & Deployment Guide

## Local Development Setup (Windows 11 / VS Code)

### Prerequisites
1. Node.js (v18 or higher) - Download from https://nodejs.org/
2. Git - Download from https://git-scm.com/
3. VS Code - Download from https://code.visualstudio.com/
4. Yarn package manager

### Installation Steps

#### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd hope-clinic
```

#### 2. Install Yarn (if not installed)
```bash
npm install -g yarn
```

#### 3. Install Dependencies
```bash
# Install root dependencies
yarn install

# Install server dependencies
cd server
yarn install

# Install client dependencies
cd ../client
yarn install
cd ..
```

#### 4. Configure Environment Variables

Create `.env` file in `/server` directory:
```env
NODE_ENV=development
PORT=8001
CLIENT_URL=http://localhost:3000

DATABASE_URL=file:./dev.db

JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d

OPENAI_API_KEY=your-openai-api-key

EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key

APP_NAME=Hope Clinic
APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@hopeclinic.com
```

Create `.env` file in `/client` directory:
```env
VITE_API_URL=http://localhost:8001/api
VITE_APP_NAME=Hope Clinic
```

#### 5. Initialize Database
```bash
cd server

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data
npx ts-node src/scripts/seed-enhanced.ts
```

#### 6. Start Development Servers

**Option 1: Run from root (both servers)**
```bash
cd ..
yarn dev
```

**Option 2: Run separately in different terminals**

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

#### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api
- Prisma Studio: `cd server && npx prisma studio`

### Default Login Credentials
- **Admin**: admin@hopeclinic.com / password123
- **Doctor**: dr.bharat@hopeclinic.com / password123
- **Patient**: patient1@example.com / password123

---

## Production Deployment (Linux VPS)

### Prerequisites on VPS
1. Ubuntu 20.04+ or similar Linux distribution
2. Root or sudo access
3. Domain name (optional but recommended)

### Step-by-Step Deployment

#### 1. Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

#### 3. Install Yarn
```bash
npm install -g yarn
```

#### 4. Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 5. Install PM2 (Process Manager)
```bash
npm install -g pm2
```

#### 6. Clone and Setup Application
```bash
cd /var/www
sudo git clone <your-repo-url> hope-clinic
cd hope-clinic
sudo chown -R $USER:$USER /var/www/hope-clinic

# Install dependencies
yarn install
cd server && yarn install
cd ../client && yarn install
cd ..
```

#### 7. Configure Environment Variables
```bash
# Create production .env files
cd server
nano .env
# Add production values (update URLs, secrets, API keys)

cd ../client
nano .env
# Update VITE_API_URL to your domain
```

#### 8. Build Frontend
```bash
cd /var/www/hope-clinic/client
yarn build
```

#### 9. Initialize Database
```bash
cd /var/www/hope-clinic/server
npx prisma generate
npx prisma migrate deploy
npx ts-node src/scripts/seed-enhanced.ts
```

#### 10. Build Backend
```bash
cd /var/www/hope-clinic/server
yarn build
```

#### 11. Start with PM2
```bash
cd /var/www/hope-clinic

# Start backend
cd server
pm2 start dist/index.js --name hope-clinic-api

# Serve frontend (production)
pm2 serve ../client/dist 3000 --name hope-clinic-frontend --spa

# Save PM2 configuration
pm2 save
pm2 startup
```

#### 12. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/hope-clinic
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/hope-clinic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 13. Install SSL Certificate (Optional but Recommended)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### 14. Setup Firewall
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Maintenance Commands

#### View Logs
```bash
# Backend logs
pm2 logs hope-clinic-api

# Frontend logs
pm2 logs hope-clinic-frontend

# All logs
pm2 logs
```

#### Restart Services
```bash
pm2 restart all
# or specific service
pm2 restart hope-clinic-api
```

#### Update Application
```bash
cd /var/www/hope-clinic
git pull

# Update dependencies if needed
yarn install
cd server && yarn install
cd ../client && yarn install

# Rebuild
cd client && yarn build
cd ../server && yarn build

# Restart
pm2 restart all
```

#### Database Migrations
```bash
cd /var/www/hope-clinic/server
npx prisma migrate deploy
```

### Monitoring
```bash
# Monitor PM2 processes
pm2 monit

# Check status
pm2 status

# Setup PM2 web dashboard (optional)
pm2 install pm2-server-monit
```

### Troubleshooting

#### Port Already in Use
```bash
# Find and kill process
lsof -ti:8001 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

#### Database Issues
```bash
cd server
npx prisma studio  # Open database GUI
npx prisma db push # Force sync schema
```

#### Nginx Issues
```bash
sudo nginx -t  # Test configuration
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

---

## Environment Variables Reference

### Backend (.env)
- `DATABASE_URL`: SQLite database file path
- `JWT_SECRET`: Secret for access tokens
- `JWT_REFRESH_SECRET`: Secret for refresh tokens
- `OPENAI_API_KEY`: Your OpenAI API key for AI chat
- `EMAILJS_*`: EmailJS credentials for sending emails

### Frontend (.env)
- `VITE_API_URL`: Backend API URL

---

## Tech Stack
- Frontend: React 18, Vite, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, TypeScript
- Database: SQLite with Prisma ORM
- Authentication: JWT
- AI: OpenAI GPT-4o
- Email: EmailJS

## Support
For issues, contact: admin@hopeclinic.com