import { Router } from 'express';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { aiService } from '../services/aiService.js';

const router = Router();

// Resume screening with AI
router.post('/screen-resume', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'resumeText and jobDescription are required' });
    }
    const result = await aiService.screenResume(resumeText, jobDescription);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Generate job description with AI
router.post('/generate-job-description', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { title, requirements, department } = req.body;
    if (!title || !requirements || !department) {
      return res.status(400).json({ error: 'title, requirements, and department are required' });
    }
    const result = await aiService.generateJobDescription(title, requirements, department);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Analyze employee performance with AI
router.post('/analyze-performance', authenticateToken, requireRole(['admin', 'hr', 'manager']), async (req, res, next) => {
  try {
    const { employeeData } = req.body;
    if (!employeeData) {
      return res.status(400).json({ error: 'employeeData is required' });
    }
    const result = await aiService.analyzePerformance(employeeData);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Generate HR insights
router.post('/generate-insights', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { data, type } = req.body;
    if (!data || !type) {
      return res.status(400).json({ error: 'data and type are required' });
    }
    const result = await aiService.generateInsights(data, type);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// Chat with AI
router.post('/chat', authenticateToken, async (req, res, next) => {
  try {
    const { question, context } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'question is required' });
    }
    const response = await aiService.chatWithAI(question, context || {});
    res.json({ response, timestamp: new Date().toISOString() });
  } catch (error) {
    next(error);
  }
});

export default router;
