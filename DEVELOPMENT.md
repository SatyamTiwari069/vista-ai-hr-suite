# Vista HR Suite - Development Guide

## Overview

Vista HR Suite is a complete HR Management System with:
- **60+ Pages** across 4 role-based dashboards
- **50+ API Endpoints** for all operations
- **15+ Database Tables** with proper relationships
- **Full Type Safety** with TypeScript
- **Responsive Design** for all devices

## Project Structure

```
vista-ai-hr-suite/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components by role
│   │   │   ├── admin/       # Admin dashboard pages
│   │   │   ├── hr/          # HR dashboard pages
│   │   │   ├── manager/     # Manager dashboard pages
│   │   │   └── employee/    # Employee dashboard pages
│   │   ├── contexts/        # React contexts (Auth, etc.)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/                  # Express.js + TypeScript backend
│   ├── src/
│   │   ├── server.ts        # Express app configuration
│   │   ├── middleware/      # Authentication, error handling
│   │   ├── routes/          # API endpoints
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── employees.ts
│   │   │   ├── attendance.ts
│   │   │   ├── leaves.ts
│   │   │   ├── jobs.ts
│   │   │   ├── candidates.ts
│   │   │   ├── payroll.ts
│   │   │   └── ai.ts
│   │   ├── services/        # Business logic
│   │   │   ├── userService.ts
│   │   │   ├── authService.ts
│   │   │   ├── attendanceService.ts
│   │   │   ├── recruitmentService.ts
│   │   │   └── payrollService.ts
│   │   ├── config/          # Configuration files
│   │   │   ├── env.ts
│   │   │   └── supabase.ts
│   │   ├── utils/           # Utility functions
│   │   └── migrations/      # Database migrations
│   ├── dist/                # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                # Main documentation
└── start.bat/.sh           # Startup scripts
```

## Setup Instructions

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install --legacy-peer-deps
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `backend/.env`:
```
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d

GEMINI_API_KEY=optional_ai_api_key

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASSWORD=your_password
```

### 3. Database Setup

The database schema includes these tables:
- `users` - User accounts with roles
- `employees` - Employee information
- `departments` - Department data
- `attendance` - Attendance records
- `leaves` - Leave requests
- `jobs` - Job postings
- `candidates` - Job applications
- `payroll` - Payroll information
- `performance` - Performance reviews
- `training` - Training programs
- `interviews` - Interview records
- `tasks` - Task management
- `documents` - Document storage
- `recognition` - Employee recognition
- `holidays` - Company holidays

## Running the Application

### Quick Start (Windows)
```batch
start.bat
```

### Quick Start (macOS/Linux)
```bash
bash start.sh
```

### Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:3001

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:8080

## Features by Role

### Admin (16 Pages)
1. Dashboard - System overview
2. User Management - CRUD operations
3. Bulk Import/Export - CSV operations
4. Roles & Permissions - Access control
5. System Settings - Configuration
6. API Management - API keys
7. Risk Management - Risk tracking
8. Custom Reports - Report builder
9. Document Management - File storage
10. SSO Integration - OAuth setup
11. Goal Tracking - Organizational goals
12. Employee Recognition - Awards
13. Attendance Rules - Policy setup
14. Integration Management - Third-party integrations
15. Audit Logs - Activity tracking
16. System Backup - Data backup

### HR (15 Pages)
1. Dashboard - HR overview
2. Job Listings - Job management
3. Candidates - Applicant tracking
4. Interview Scheduler - Interview management
5. Employee Lifecycle - Onboarding/Offboarding
6. Training & Development - Training programs
7. Departments - Department management
8. Payroll Management - Salary processing
9. Employee Recognition - Awards & incentives
10. HR Goals - Department goals
11. Compliance & Policies - Policy management
12. Benefits Management - Benefits tracking
13. Workforce Planning - Resource planning
14. HR Reports - Analytics & reports
15. Employee Directory - Contact information

### Manager (12 Pages)
1. Dashboard - Team overview
2. Team Members - Team management
3. Project Management - Project tracking
4. Task Management - Task assignment
5. Communication - Internal messaging
6. Documents - Document sharing
7. Attendance - Team attendance
8. Leave Approvals - Approve/reject leaves
9. Performance Reviews - Performance management
10. Team Goals - Team objectives
11. Reports - Team analytics
12. One-on-One Meetings - Meeting scheduler

### Employee (17 Pages)
1. Dashboard - Personal overview
2. Profile - Personal information
3. Attendance - Clock in/out
4. Leave - Apply & view history
5. Tasks - Task management
6. Performance - Performance reviews
7. Training - Enrollment & completion
8. Documents - Access documents
9. Salary - Salary information
10. Benefits - Benefits information
11. Directory - Company directory
12. Announcements - Company news
13. Help Desk - Support tickets
14. Time & Expense - Time tracking
15. Self-Service - Self-service portal
16. Learning - Training resources
17. Team Chat - Team collaboration

## API Endpoints Reference

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get user
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/bulk/import` - Bulk import
- `POST /api/users/bulk/export` - Bulk export

### Employees
- `GET /api/employees` - List employees
- `GET /api/employees/:id` - Get employee
- `GET /api/employees/stats/dashboard` - Employee stats
- `GET /api/employees/stats/lifecycle` - Lifecycle stats

### Attendance
- `GET /api/attendance` - List attendance
- `POST /api/attendance/clock-in` - Clock in
- `POST /api/attendance/clock-out` - Clock out

### Leaves
- `GET /api/leaves` - List leave requests
- `POST /api/leaves` - Create leave request
- `PUT /api/leaves/:id` - Update leave request
- `DELETE /api/leaves/:id` - Delete leave request

### Jobs & Recruitment
- `GET /api/jobs` - List job postings
- `POST /api/jobs` - Create job posting
- `GET /api/candidates` - List candidates
- `POST /api/candidates` - Create candidate
- `POST /api/candidates/screen` - AI screening

### Payroll
- `GET /api/payroll` - List payroll records
- `POST /api/payroll/process` - Process payroll

## Frontend Development

### Component Structure
- UI Components: `src/components/ui/` - Reusable Tailwind + shadcn components
- Page Components: `src/pages/` - Role-specific pages
- Layout: `src/components/layout/` - Page layouts
- Navigation: `src/config/navigation.ts` - Route configuration

### Adding a New Page
1. Create file in `src/pages/[role]/NewPage.tsx`
2. Import components and hooks
3. Add to navigation config in `src/config/navigation.ts`
4. Update routing in `src/App.tsx`

### Styling
- Tailwind CSS for styling
- shadcn/ui for components
- CSS modules for scoped styles
- Responsive classes: `sm:`, `md:`, `lg:`, `xl:`

## Backend Development

### Adding a New API Endpoint

1. Create service method in `src/services/`
2. Add route in `src/routes/`
3. Register route in `src/server.ts`

Example:
```typescript
// routes/example.ts
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const data = await exampleService.getData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// server.ts
app.use('/api/example', exampleRoutes);
```

### Error Handling
- All errors caught by middleware
- Consistent error response format
- Proper HTTP status codes
- Error logging enabled

## Testing

### Frontend Testing
- Manual testing through UI
- Browser DevTools for debugging
- Network tab for API calls

### Backend Testing
```bash
# Health check
curl http://localhost:3001/health

# API info
curl http://localhost:3001/

# Test endpoint
curl http://localhost:3001/api/users
```

## Performance Optimization

### Frontend
- Code splitting with Vite
- Lazy loading of routes
- Image optimization
- Caching strategies
- Minified production builds

### Backend
- Query optimization
- Database indexing
- Caching responses
- Load balancing ready

## Security Best Practices

1. **Authentication**: JWT tokens with expiration
2. **Authorization**: Role-based access control
3. **Data Validation**: Input sanitization
4. **API Security**: CORS configuration
5. **Password Security**: bcryptjs hashing
6. **Error Handling**: No sensitive data in errors

## Deployment

### Frontend Production Build
```bash
cd frontend
npm run build
```
Output: `frontend/dist/`

### Backend Production Build
```bash
cd backend
npm run build
npm start
```

### Deployment Platforms
- Frontend: Vercel, Netlify, GitHub Pages
- Backend: Heroku, Railway, AWS, GCP
- Database: Supabase (PostgreSQL)

## Troubleshooting

### Issues Starting Servers

**Backend won't start:**
- Check Node.js version (need v20+)
- Check .env file exists and is configured
- Clear node_modules: `rm -rf node_modules && npm install --legacy-peer-deps`

**Frontend shows blank page:**
- Check backend is running
- Open DevTools console for errors
- Clear browser cache

**API calls failing:**
- Check backend is on port 3001
- Verify CORS is configured
- Check authentication token is valid

### Database Issues

**Connection failed:**
- Verify Supabase credentials
- Check internet connection
- Ensure database is accessible

**Migration issues:**
- Run migrations from backend directory
- Check database permissions
- Verify schema exists

## Contributing

1. Create a new branch for features
2. Follow TypeScript strict mode
3. Add proper type definitions
4. Test before committing
5. Keep commits atomic
6. Write descriptive commit messages

## Support

For issues and questions:
1. Check existing issues
2. Review code comments
3. Check API documentation
4. Review error logs

---

Happy coding! 🚀
