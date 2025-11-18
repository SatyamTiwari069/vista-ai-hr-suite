import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { userService, employeeService, departmentService } from '../services/userService.js';

const router = Router();

// User management endpoints
router.get('/', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const filters = {
      role: req.query.role as string,
      department: req.query.department as string,
    };
    const users = await userService.getAllUsers(filters);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Bulk import/export
router.post('/bulk/import', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const users = await userService.bulkImportUsers(req.body.users);
    res.status(201).json({ imported: users.length, users });
  } catch (error) {
    next(error);
  }
});

router.post('/bulk/export', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const users = await userService.bulkExportUsers(req.body.filters);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Employee stats
router.get('/stats/dashboard', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const stats = await employeeService.getEmployeeStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.get('/stats/lifecycle', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const stats = await employeeService.getEmployeeLifecycleStatus();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// Department endpoints
router.get('/departments', authenticateToken, async (req, res, next) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.json(departments);
  } catch (error) {
    next(error);
  }
});

router.post('/departments', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const dept = await departmentService.createDepartment(req.body);
    res.status(201).json(dept);
  } catch (error) {
    next(error);
  }
});

router.put('/departments/:id', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    const dept = await departmentService.updateDepartment(req.params.id, req.body);
    res.json(dept);
  } catch (error) {
    next(error);
  }
});

router.delete('/departments/:id', authenticateToken, requireRole(['admin']), async (req, res, next) => {
  try {
    await departmentService.deleteDepartment(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
