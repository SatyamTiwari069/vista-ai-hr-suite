import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { attendanceService, leaveService } from '../services/attendanceService.js';

const router = Router();

// Clock in/out endpoints
router.post('/clock-in', authenticateToken, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const { location } = req.body;
    const record = await attendanceService.clockIn(userId, location);
    res.status(201).json(record);
  } catch (error) {
    next(error);
  }
});

router.post('/clock-out', authenticateToken, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const { attendanceId } = req.body;
    const record = await attendanceService.clockOut(userId, attendanceId);
    res.json(record);
  } catch (error) {
    next(error);
  }
});

// Get attendance records
router.get('/records/:userId', authenticateToken, async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const records = await attendanceService.getAttendanceRecords(
      req.params.userId,
      startDate as string,
      endDate as string
    );
    res.json(records);
  } catch (error) {
    next(error);
  }
});

// Mark attendance manually
router.post('/mark', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const { userId, date, status } = req.body;
    const record = await attendanceService.markAttendance(userId, date, status);
    res.json(record);
  } catch (error) {
    next(error);
  }
});

// Get monthly stats
router.get('/stats/monthly/:userId', authenticateToken, async (req, res, next) => {
  try {
    const { year, month } = req.query;
    const stats = await attendanceService.getMonthlyAttendanceStats(
      req.params.userId,
      parseInt(year as string) || new Date().getFullYear(),
      parseInt(month as string) || new Date().getMonth() + 1
    );
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

// Get department attendance
router.get('/department/:departmentId', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const { date } = req.query;
    const records = await attendanceService.getDepartmentAttendance(
      req.params.departmentId,
      (date as string) || new Date().toISOString().split('T')[0]
    );
    res.json(records);
  } catch (error) {
    next(error);
  }
});

// Leave endpoints
router.post('/leave/apply', authenticateToken, async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const leave = await leaveService.applyLeave(userId, req.body);
    res.status(201).json(leave);
  } catch (error) {
    next(error);
  }
});

router.get('/leave/balance/:userId', authenticateToken, async (req, res, next) => {
  try {
    const balance = await leaveService.getLeaveBalance(req.params.userId);
    res.json(balance);
  } catch (error) {
    next(error);
  }
});

router.get('/leave/history/:userId', authenticateToken, async (req, res, next) => {
  try {
    const leaves = await leaveService.getLeaveHistory(req.params.userId);
    res.json(leaves);
  } catch (error) {
    next(error);
  }
});

router.get('/leave/user/:userId', authenticateToken, async (req, res, next) => {
  try {
    const { status, year } = req.query;
    const leaves = await leaveService.getUserLeaves(req.params.userId, {
      status: status as string,
      year: year ? parseInt(year as string) : undefined,
    });
    res.json(leaves);
  } catch (error) {
    next(error);
  }
});

router.get('/leave/pending', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const { departmentId } = req.query;
    const result = await leaveService.getPendingLeaves(departmentId as string);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/leave/:leaveId/approve', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const approverId = (req as any).user.id;
    const { comments } = req.body;
    const leave = await leaveService.approveLeave(req.params.leaveId, approverId, comments);
    res.json(leave);
  } catch (error) {
    next(error);
  }
});

router.post('/leave/:leaveId/reject', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const { reason } = req.body;
    const leave = await leaveService.rejectLeave(req.params.leaveId, reason);
    res.json(leave);
  } catch (error) {
    next(error);
  }
});

export default router;