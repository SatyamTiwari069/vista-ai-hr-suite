import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { payrollService, performanceService, trainingService } from '../services/payrollService.js';

const router = Router();

// Payroll endpoints
router.get('/:userId', authenticateToken, async (req, res, next) => {
  try {
    const data = await payrollService.getPayrollData(req.params.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/payslip', authenticateToken, async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const payslip = await payrollService.getPayslip(
      req.params.userId,
      parseInt(month as string) || new Date().getMonth() + 1,
      parseInt(year as string) || new Date().getFullYear()
    );
    res.json(payslip);
  } catch (error) {
    next(error);
  }
});

router.post('/process', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { month, year } = req.body;
    const records = await payrollService.processPayroll(month, year);
    res.status(201).json({ processed: records.length, records });
  } catch (error) {
    next(error);
  }
});

router.get('/summary', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const summary = await payrollService.getPayrollSummary({
      month: month ? parseInt(month as string) : undefined,
      year: year ? parseInt(year as string) : undefined,
    });
    res.json(summary);
  } catch (error) {
    next(error);
  }
});

// Performance endpoints
router.get('/performance/:userId', authenticateToken, async (req, res, next) => {
  try {
    const review = await performanceService.getPerformanceReview(req.params.userId);
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.post('/performance', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const review = await performanceService.createPerformanceReview(req.body);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
});

router.get('/performance/history/:userId', authenticateToken, async (req, res, next) => {
  try {
    const history = await performanceService.getPerformanceHistory(req.params.userId);
    res.json(history);
  } catch (error) {
    next(error);
  }
});

router.get('/performance/team/:departmentId', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const data = await performanceService.getTeamPerformance(req.params.departmentId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/performance/metrics', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const metrics = await performanceService.getPerformanceMetrics();
    res.json(metrics);
  } catch (error) {
    next(error);
  }
});

router.post('/performance/:userId/goals', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const { goals } = req.body;
    const result = await performanceService.setPerformanceGoals(req.params.userId, goals);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// Training endpoints
router.get('/training/programs', authenticateToken, async (req, res, next) => {
  try {
    const { department, status } = req.query;
    const programs = await trainingService.getTrainingPrograms({
      department: department as string,
      status: status as string,
    });
    res.json(programs);
  } catch (error) {
    next(error);
  }
});

router.post('/training/enroll', authenticateToken, async (req, res, next) => {
  try {
    const { trainingId } = req.body;
    const userId = (req as any).user.id;
    const enrollment = await trainingService.enrollInTraining(userId, trainingId);
    res.status(201).json(enrollment);
  } catch (error) {
    next(error);
  }
});

router.get('/training/:userId', authenticateToken, async (req, res, next) => {
  try {
    const enrollments = await trainingService.getEmployeeTraining(req.params.userId);
    res.json(enrollments);
  } catch (error) {
    next(error);
  }
});

router.post('/training/:enrollmentId/complete', authenticateToken, async (req, res, next) => {
  try {
    const { certificateUrl } = req.body;
    const result = await trainingService.completeTraining(req.params.enrollmentId, certificateUrl);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/training/metrics', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { departmentId } = req.query;
    const metrics = await trainingService.getTrainingMetrics(departmentId as string);
    res.json(metrics);
  } catch (error) {
    next(error);
  }
});

export default router;
