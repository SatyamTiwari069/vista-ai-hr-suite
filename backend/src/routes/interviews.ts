import { Router, Request, Response } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { interviewService } from '../services/interviewService.js';
import { logger } from '../utils/logger.js';

const router = Router();

/**
 * Schedule a new interview
 * POST /api/interviews
 */
router.post('/', authenticateToken, requireRole(['hr', 'admin', 'manager']), async (req: Request, res: Response) => {
  try {
    const interview = await interviewService.scheduleInterview(req.body);
    res.status(201).json(interview);
  } catch (error: any) {
    logger.error('Schedule interview error:', error);
    res.status(500).json({ error: error.message || 'Failed to schedule interview' });
  }
});

/**
 * Get interviews for a candidate
 * GET /api/interviews/candidate/:candidateId
 */
router.get('/candidate/:candidateId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const interviews = await interviewService.getCandidateInterviews(req.params.candidateId);
    res.json(interviews);
  } catch (error: any) {
    logger.error('Get candidate interviews error:', error);
    res.status(500).json({ error: error.message || 'Failed to get interviews' });
  }
});

/**
 * Get interviewer's schedule
 * GET /api/interviews/schedule/:interviewerId
 */
router.get('/schedule/:interviewerId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const interviews = await interviewService.getInterviewerSchedule(
      req.params.interviewerId,
      startDate as string,
      endDate as string
    );
    res.json(interviews);
  } catch (error: any) {
    logger.error('Get interviewer schedule error:', error);
    res.status(500).json({ error: error.message || 'Failed to get schedule' });
  }
});

/**
 * Get upcoming interviews
 * GET /api/interviews/upcoming
 */
router.get('/upcoming', authenticateToken, requireRole(['hr', 'admin', 'manager']), async (req: Request, res: Response) => {
  try {
    const { days } = req.query;
    const interviews = await interviewService.getUpcomingInterviews(
      days ? parseInt(days as string) : 7
    );
    res.json(interviews);
  } catch (error: any) {
    logger.error('Get upcoming interviews error:', error);
    res.status(500).json({ error: error.message || 'Failed to get upcoming interviews' });
  }
});

/**
 * Get all interviews
 * GET /api/interviews
 */
router.get('/', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const interviews = await interviewService.getUpcomingInterviews(365);
    
    const filtered = jobId
      ? interviews.filter((i: any) => i.job_id === jobId)
      : interviews;

    res.json(filtered);
  } catch (error: any) {
    logger.error('Get interviews error:', error);
    res.status(500).json({ error: error.message || 'Failed to get interviews' });
  }
});

/**
 * Update interview status
 * PUT /api/interviews/:id/status
 */
router.put('/:id/status', authenticateToken, requireRole(['hr', 'admin', 'manager']), async (req: Request, res: Response) => {
  try {
    const { status, result } = req.body;
    const interview = await interviewService.updateInterviewStatus(req.params.id, status, result);
    res.json(interview);
  } catch (error: any) {
    logger.error('Update interview status error:', error);
    res.status(500).json({ error: error.message || 'Failed to update interview' });
  }
});

/**
 * Reschedule interview
 * PUT /api/interviews/:id/reschedule
 */
router.put('/:id/reschedule', authenticateToken, requireRole(['hr', 'admin', 'manager']), async (req: Request, res: Response) => {
  try {
    const { newDate, newTime } = req.body;
    const interview = await interviewService.rescheduleInterview(req.params.id, newDate, newTime);
    res.json(interview);
  } catch (error: any) {
    logger.error('Reschedule interview error:', error);
    res.status(500).json({ error: error.message || 'Failed to reschedule interview' });
  }
});

/**
 * Add interview feedback
 * POST /api/interviews/:id/feedback
 */
router.post('/:id/feedback', authenticateToken, async (req: Request, res: Response) => {
  try {
    const feedback = await interviewService.addInterviewFeedback(req.params.id, req.body);
    res.status(201).json(feedback);
  } catch (error: any) {
    logger.error('Add interview feedback error:', error);
    res.status(500).json({ error: error.message || 'Failed to add feedback' });
  }
});

/**
 * Get interview feedback
 * GET /api/interviews/:id/feedback
 */
router.get('/:id/feedback', authenticateToken, async (req: Request, res: Response) => {
  try {
    const feedback = await interviewService.getInterviewFeedback(req.params.id);
    res.json(feedback || {});
  } catch (error: any) {
    logger.error('Get interview feedback error:', error);
    res.status(500).json({ error: error.message || 'Failed to get feedback' });
  }
});

/**
 * Cancel interview
 * DELETE /api/interviews/:id
 */
router.delete('/:id', authenticateToken, requireRole(['hr', 'admin', 'manager']), async (req: Request, res: Response) => {
  try {
    const { reason } = req.body;
    const interview = await interviewService.cancelInterview(req.params.id, reason);
    res.json(interview);
  } catch (error: any) {
    logger.error('Cancel interview error:', error);
    res.status(500).json({ error: error.message || 'Failed to cancel interview' });
  }
});

/**
 * Get interview statistics
 * GET /api/interviews/stats
 */
router.get('/stats', authenticateToken, requireRole(['hr', 'admin']), async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const stats = await interviewService.getInterviewStats(jobId as string);
    res.json(stats);
  } catch (error: any) {
    logger.error('Get interview stats error:', error);
    res.status(500).json({ error: error.message || 'Failed to get stats' });
  }
});

export default router;
