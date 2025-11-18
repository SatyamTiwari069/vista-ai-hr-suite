import { Router, Request, Response } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { documentService } from '../services/documentService.js';
import { logger } from '../utils/logger.js';

const router = Router();

/**
 * Download salary slip
 * GET /api/documents/salary-slip/:userId/:month/:year
 */
router.get('/salary-slip/:userId/:month/:year', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId, month, year } = req.params;
    const content = await documentService.generateSalarySlip(userId, parseInt(month), parseInt(year));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="salary-slip-${month}-${year}.csv"`);
    res.send(content);

    logger.info(`Salary slip downloaded for user: ${userId}`);
  } catch (error: any) {
    logger.error('Download salary slip error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate salary slip' });
  }
});

/**
 * Download resume
 * GET /api/documents/resume/:candidateId
 */
router.get('/resume/:candidateId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const content = await documentService.generateCandidateResume(req.params.candidateId);

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="resume-${req.params.candidateId}.txt"`);
    res.send(content);

    logger.info(`Resume downloaded for candidate: ${req.params.candidateId}`);
  } catch (error: any) {
    logger.error('Download resume error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate resume' });
  }
});

/**
 * Download attendance report
 * GET /api/documents/attendance-report
 */
router.get('/attendance-report', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId, startDate, endDate } = req.query;
    const content = await documentService.generateAttendanceReport(
      userId as string,
      startDate as string,
      endDate as string
    );

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="attendance-report-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(content);

    logger.info('Attendance report downloaded');
  } catch (error: any) {
    logger.error('Download attendance report error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate attendance report' });
  }
});

/**
 * Download employee report
 * GET /api/documents/employee-report
 */
router.get('/employee-report', authenticateToken, requireRole(['hr', 'admin']), async (req: Request, res: Response) => {
  try {
    const { departmentId } = req.query;
    const content = await documentService.generateEmployeeReport(departmentId as string);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="employee-report-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(content);

    logger.info('Employee report downloaded');
  } catch (error: any) {
    logger.error('Download employee report error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate employee report' });
  }
});

/**
 * Download leave report
 * GET /api/documents/leave-report
 */
router.get('/leave-report', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const content = await documentService.generateLeaveReport(userId as string);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="leave-report-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(content);

    logger.info('Leave report downloaded');
  } catch (error: any) {
    logger.error('Download leave report error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate leave report' });
  }
});

/**
 * Download performance report
 * GET /api/documents/performance-report
 */
router.get('/performance-report', authenticateToken, requireRole(['hr', 'admin', 'manager']), async (req: Request, res: Response) => {
  try {
    const { userId, departmentId } = req.query;
    const content = await documentService.generatePerformanceReport(userId as string, departmentId as string);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="performance-report-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(content);

    logger.info('Performance report downloaded');
  } catch (error: any) {
    logger.error('Download performance report error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate performance report' });
  }
});

/**
 * Download payroll report
 * GET /api/documents/payroll-report/:month/:year
 */
router.get('/payroll-report/:month/:year', authenticateToken, requireRole(['hr', 'admin']), async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    const content = await documentService.generatePayrollReport(parseInt(month), parseInt(year));

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="payroll-report-${month}-${year}.csv"`);
    res.send(content);

    logger.info(`Payroll report downloaded for ${month}/${year}`);
  } catch (error: any) {
    logger.error('Download payroll report error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate payroll report' });
  }
});

/**
 * Download recruitment report
 * GET /api/documents/recruitment-report
 */
router.get('/recruitment-report', authenticateToken, requireRole(['hr', 'admin']), async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const content = await documentService.generateRecruitmentReport(jobId as string);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="recruitment-report-${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(content);

    logger.info('Recruitment report downloaded');
  } catch (error: any) {
    logger.error('Download recruitment report error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate recruitment report' });
  }
});

export default router;
