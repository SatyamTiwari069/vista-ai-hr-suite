import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { recruitmentService, candidateService, interviewService } from '../services/recruitmentService.js';

const router = Router();

// Job listings
router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { status, department } = req.query;
    const jobs = await recruitmentService.getJobListings({
      status: status as string,
      department: department as string,
    });
    res.json(jobs);
  } catch (error) {
    next(error);
  }
});

router.get('/:jobId', authenticateToken, async (req, res, next) => {
  try {
    const job = await recruitmentService.getJobById(req.params.jobId);
    res.json(job);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const job = await recruitmentService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
});

router.put('/:jobId', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const job = await recruitmentService.updateJobStatus(req.params.jobId, req.body.status);
    res.json(job);
  } catch (error) {
    next(error);
  }
});

// Generate job description using AI
router.post('/generate-description', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { jobTitle, department, requirements } = req.body;
    const description = await recruitmentService.generateJobDescription(jobTitle, department, requirements);
    res.json({ description });
  } catch (error) {
    next(error);
  }
});

// Candidates
router.post('/candidates', authenticateToken, async (req, res, next) => {
  try {
    const candidate = await candidateService.addCandidate(req.body);
    res.status(201).json(candidate);
  } catch (error) {
    next(error);
  }
});

router.get('/candidates/job/:jobId', authenticateToken, async (req, res, next) => {
  try {
    const candidates = await candidateService.getCandidatesForJob(req.params.jobId);
    res.json(candidates);
  } catch (error) {
    next(error);
  }
});

router.put('/candidates/:candidateId', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const candidate = await candidateService.updateCandidateStatus(req.params.candidateId, status, notes);
    res.json(candidate);
  } catch (error) {
    next(error);
  }
});

// Resume screening
router.post('/screen-resume', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const evaluation = await candidateService.screenResume(resumeText, jobDescription);
    res.json(evaluation);
  } catch (error) {
    next(error);
  }
});

// Hiring insights
router.get('/analytics/insights', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const insights = await candidateService.getHiringInsights();
    res.json(insights);
  } catch (error) {
    next(error);
  }
});

// Interviews
router.post('/interviews', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const interview = await interviewService.scheduleInterview(req.body);
    res.status(201).json(interview);
  } catch (error) {
    next(error);
  }
});

router.get('/interviews', authenticateToken, async (req, res, next) => {
  try {
    const { interviewerId, status } = req.query;
    const interviews = await interviewService.getScheduledInterviews({
      interviewerId: interviewerId as string,
      status: status as string,
    });
    res.json(interviews);
  } catch (error) {
    next(error);
  }
});

router.post('/interviews/:interviewId/result', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const interview = await interviewService.updateInterviewResult(req.params.interviewId, req.body);
    res.json(interview);
  } catch (error) {
    next(error);
  }
});

export default router;