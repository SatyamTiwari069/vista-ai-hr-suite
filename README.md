# Vista HR Suite - Complete HRMS Solution

A modern, full-stack Human Resources Management System built with React, TypeScript, and Express.js with 60+ pages and comprehensive features for Admin, HR, Manager, and Employee roles.

## Project Structure

```
vista-ai-hr-suite/
├── frontend/              # React frontend application
│   ├── src/              # Frontend source code
│   ├── public/           # Static assets
│   ├── package.json
│   └── vite.config.ts
├── backend/              # Express.js API server
│   ├── src/              # Backend source code
│   ├── dist/             # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js v20.17.0 or higher
- npm 10.8.3 or higher
- Supabase account (for database)

### 1. Backend Setup

```bash
cd backend
npm install --legacy-peer-deps
```

Create `.env` file in backend directory:
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:8080

## Features

### ✅ Admin Dashboard (16 Pages)
- User Management & Bulk Import/Export
- Role-based Access Control
- System Configuration & Settings
- API Management & Key Generation
- Risk Management & Compliance
- Custom Report Builder
- Document Management
- SSO Integration
- Goal Tracking
- Employee Recognition
- Attendance Rules & Policies
- System Integration Management
- Audit Logs
- Holiday Calendar Management
- Organizational Structure
- System Backup & Recovery

### ✅ HR Dashboard (15 Pages)
- Recruitment & Job Management
- Candidate Tracking & Screening
- Interview Scheduling
- Training & Development Programs
- Department Management
- Payroll Management
- Employee Lifecycle
- Onboarding Workflows
- HR Goals & Metrics
- Employee Recognition
- Compliance & Policies
- Benefits Management
- Workforce Planning
- HR Reports & Analytics
- Employee Directory

### ✅ Manager Dashboard (12 Pages)
- Team Management
- Project Management
- Task Assignment & Tracking
- Team Communication
- Performance Management
- Leave Approvals
- Attendance Tracking
- Team Documents
- One-on-One Meetings
- Team Goals & OKRs
- Resource Planning
- Team Reports

### ✅ Employee Dashboard (17 Pages)
- Personal Dashboard
- Attendance & Leave Tracking
- Leave Application
- Task Management
- Performance Reviews
- Training Enrollment
- Document Access
- Personal Profile
- Salary Information
- Benefits Information
- Company Directory
- Announcements
- Help Desk Support
- Time & Expense Tracking
- Self-Service Portal
- Learning Resources
- Team Collaboration

## Technology Stack

### Frontend
- **React** 18.3.1
- **TypeScript** 5.4.0
- **Vite** 5.4.19
- **Tailwind CSS** 3.4.1
- **shadcn/ui** - Component library
- **React Router** v6.30.1
- **React Query** - Data fetching
- **Lucide React** - Icons
- **React Hook Form** - Form management
- **Supabase JS** - Database client

### Backend
- **Express.js** 4.18.2
- **TypeScript** 5.3.3
- **Node.js** v20.17.0
- **Supabase** PostgreSQL
- **JWT** Authentication
- **bcryptjs** Password hashing
- **Axios** HTTP client
- **express-validator** Input validation
- **CORS** Cross-origin support

## API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

| Endpoint | Description |
|----------|-------------|
| `POST /auth/login` | User login |
| `POST /auth/register` | User registration |
| `GET /users` | Get all users |
| `POST /users` | Create user |
| `PUT /users/:id` | Update user |
| `DELETE /users/:id` | Delete user |
| `GET /employees` | Get employees |
| `POST /attendance/clock-in` | Clock in |
| `POST /attendance/clock-out` | Clock out |
| `GET /leaves` | Get leave records |
| `POST /leaves` | Request leave |
| `GET /jobs` | Get job postings |
| `POST /jobs` | Create job posting |
| `GET /candidates` | Get candidates |
| `POST /payroll` | Process payroll |
| `GET /health` | Health check |

## Database Schema

The application includes 15+ PostgreSQL tables:

- `users` - User accounts
- `employees` - Employee information
- `departments` - Department data
- `jobs` - Job postings
- `candidates` - Job candidates
- `attendance` - Attendance records
- `leaves` - Leave requests
- `payroll` - Payroll information
- `performance` - Performance reviews
- `training` - Training programs
- `interviews` - Interview records
- `tasks` - Task management
- `documents` - Document storage
- `recognition` - Recognition records
- `holidays` - Company holidays

## Project Stats

- **60+ Pages** across 4 role-based dashboards
- **50+ API Endpoints** with full CRUD operations
- **15+ Database Tables** with relationships
- **100+ Components** including UI and page components
- **Full TypeScript** type safety
- **Responsive Design** - Mobile, Tablet, Desktop
- **Dark Mode Ready** - Tailwind CSS theming

## Responsive Design

- ✅ Desktop (1920px+)
- ✅ Laptop (1440px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

## Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcryptjs)
- ✅ Role-Based Access Control
- ✅ Input Validation & Sanitization
- ✅ CORS Configuration
- ✅ Error Handling & Logging
- ✅ Secure Headers (Helmet.js)

## Build & Deploy

### Build Frontend
```bash
cd frontend
npm run build
```

### Build Backend
```bash
cd backend
npm run build
```

### Production Start
```bash
cd backend
npm start
```

## Troubleshooting

### Backend won't start
1. Ensure Node.js v20+ is installed
2. Install dependencies: `npm install --legacy-peer-deps`
3. Check `.env` file is properly configured
4. Clear node_modules and reinstall if issues persist

### Frontend shows 404
1. Ensure backend is running on http://localhost:3001
2. Check frontend is running on http://localhost:8080
3. Clear browser cache and reload

### Database connection issues
1. Verify Supabase credentials in `.env`
2. Check database tables exist
3. Ensure service role key has proper permissions

## Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Image optimization
- ✅ Lazy loading of routes
- ✅ Caching strategies
- ✅ Query optimization
- ✅ Minified production builds

## Development Guidelines

1. Frontend changes are hot-reloaded
2. Backend changes require rebuild: `npm run build`
3. Follow TypeScript strict mode
4. Use proper error handling
5. Add proper type definitions
6. Test all features before committing

## License

Proprietary - Vista AI HR Suite

## Support & Documentation

For detailed documentation and support, refer to the inline code comments and API endpoint documentation.

---

**Happy coding! 🚀**
