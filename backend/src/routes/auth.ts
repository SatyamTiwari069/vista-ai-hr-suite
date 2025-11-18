import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { authService } from '../services/authService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const result = await authService.authenticateUser(email, password);
      res.json(result);
    } catch (error) {
      next(error);
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

export default router;
