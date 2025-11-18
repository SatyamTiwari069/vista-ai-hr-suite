import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { authService } from '../services/authService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      
      // Development mode: allow any email/password format
      if (process.env.NODE_ENV !== 'development') {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
      }

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const result = await authService.authenticateUser(email, password);
      res.json(result);
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(401).json({ error: error.message || 'Invalid credentials' });
    }
  }
);

router.post(
  '/register',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty(),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name, role } = req.body;
      const result = await authService.registerUser(email, password, name, role);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: (req as any).user });
});

// Development only: Seed test users
router.post('/dev/seed-users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ error: 'Only available in development' });
    }

    const testUsers = [
      { email: 'admin@vista.com', password: 'admin123', name: 'Admin User', role: 'admin' },
      { email: 'hr@vista.com', password: 'hr123', name: 'HR Manager', role: 'hr' },
      { email: 'manager@vista.com', password: 'manager123', name: 'Team Manager', role: 'manager' },
      { email: 'employee@vista.com', password: 'employee123', name: 'John Doe', role: 'employee' },
    ];

    const results = [];
    for (const user of testUsers) {
      try {
        const result = await authService.registerUser(user.email, user.password, user.name, user.role);
        results.push({ email: user.email, success: true });
      } catch (error: any) {
        results.push({ email: user.email, success: false, error: error.message });
      }
    }

    res.json({ message: 'Seed complete', results });
  } catch (error) {
    next(error);
  }
});

export default router;
