import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import employeeRoutes from './routes/employees.js';
import attendanceRoutes from './routes/attendance.js';
import leaveRoutes from './routes/leaves.js';
import jobRoutes from './routes/jobs.js';
import candidateRoutes from './routes/candidates.js';
import payrollRoutes from './routes/payroll.js';
import aiRoutes from './routes/ai.js';
import uploadsRoutes from './routes/uploads.js';
import interviewRoutes from './routes/interviews.js';
import documentsRoutes from './routes/documents.js';

const app = express();

app.use(helmet());
app.use(cors({
  origin: config.server.frontendUrl,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Health check & info endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Vista HRMS Backend is running' });
});

app.get('/', (req, res) => {
  res.json({ 
    name: 'Vista HRMS Backend API',
    version: '1.0.0',
    status: 'running',
    message: 'Use /api/* endpoints for API calls',
    endpoints: {
      auth: '/api/auth (login, register)',
      users: '/api/users (user management)',
      employees: '/api/employees (employee data)',
      attendance: '/api/attendance (attendance tracking)',
      leaves: '/api/leaves (leave management)',
      jobs: '/api/jobs (job postings)',
      candidates: '/api/candidates (recruitment)',
      payroll: '/api/payroll (payroll, performance, training)',
      ai: '/api/ai (AI features)',
      uploads: '/api/uploads (file upload/download)',
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/documents', documentsRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

const PORT = config.server.port;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📝 Frontend URL: ${config.server.frontendUrl}`);
  logger.info(`🔒 Environment: ${config.server.nodeEnv}`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: any) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

export default app;