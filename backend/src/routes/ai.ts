import express, { Request, Response } from 'express';
import { logger } from '../utils/logger.js';
import geminiService from '../services/geminiService.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

/**
 * AI Routes for Vista HRMS
 * ============================================================================
 * Endpoints for AI-powered features:
 * - Resume screening with Gemini
 * - Job description generation
 * - HR conversations
 * - Interview preparation
 * - Performance analysis
 * - Training recommendations
 */

/**
 * POST /api/ai/screen-resume
 * Screen resume against job requirements using Gemini AI
 */
router.post('/screen-resume', authenticateToken, requireRole(['admin', 'hr_recruiter']), async (req: Request, res: Response) => {
  try {
    const { resumeText, jobDescription, candidateName } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        error: 'Resume text and job description are required',
      });
    }

    const result = await geminiService.screenResume(resumeText, jobDescription, candidateName || 'Candidate');

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Resume screening error:', error);
    res.status(500).json({
      error: 'Resume screening failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/generate-job-desc
 * Generate comprehensive job description using AI
 */
router.post('/generate-job-desc', authenticateToken, requireRole(['admin', 'hr_recruiter']), async (req: Request, res: Response) => {
  try {
    const { jobTitle, departmentContext, companyInfo, requiredExperience, salary } = req.body;

    if (!jobTitle || !departmentContext) {
      return res.status(400).json({
        error: 'Job title and department context are required',
      });
    }

    const result = await geminiService.generateJobDescription(
      jobTitle,
      departmentContext,
      companyInfo || 'Modern tech company',
      requiredExperience || '3+ years',
      salary || { min: 60000, max: 120000 }
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Job description generation error:', error);
    res.status(500).json({
      error: 'Job description generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/chat
 * Intelligent HR conversation using Gemini
 */
router.post('/chat', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { query, employeeRole, department, previousContext } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Query is required',
      });
    }

    const result = await geminiService.generateHRResponse(query, {
      employeeRole,
      department,
      previousContext,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('AI chat error:', error);
    res.status(500).json({
      error: 'Chat failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/interview-prep
 * Generate interview preparation materials for a candidate
 */
router.post('/interview-prep', authenticateToken, requireRole(['admin', 'hr_recruiter']), async (req: Request, res: Response) => {
  try {
    const { candidateBackground, jobRole, interviewType } = req.body;

    if (!candidateBackground || !jobRole) {
      return res.status(400).json({
        error: 'Candidate background and job role are required',
      });
    }

    const result = await geminiService.generateInterviewPrep(
      candidateBackground,
      jobRole,
      interviewType || 'technical'
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Interview prep generation error:', error);
    res.status(500).json({
      error: 'Interview prep generation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/analyze-performance
 * Analyze performance review and generate insights
 */
router.post('/analyze-performance', authenticateToken, requireRole(['admin', 'senior_manager']), async (req: Request, res: Response) => {
  try {
    const { employeeName, reviewContent, role, department } = req.body;

    if (!reviewContent) {
      return res.status(400).json({
        error: 'Review content is required',
      });
    }

    const result = await geminiService.analyzePerformanceReview(
      employeeName || 'Employee',
      reviewContent,
      role || 'Unknown',
      department || 'Unknown'
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Performance analysis error:', error);
    res.status(500).json({
      error: 'Performance analysis failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/training-recommendations
 * Generate personalized training recommendations
 */
router.post('/training-recommendations', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { employeeName, currentRole, skills, goals, performanceReview } = req.body;

    if (!currentRole || !skills) {
      return res.status(400).json({
        error: 'Current role and skills are required',
      });
    }

    const result = await geminiService.generateTrainingRecommendations(
      employeeName || 'Employee',
      currentRole,
      Array.isArray(skills) ? skills : [],
      Array.isArray(goals) ? goals : [],
      performanceReview || 'No prior review'
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Training recommendations error:', error);
    res.status(500).json({
      error: 'Training recommendations failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * POST /api/ai/nlp-query
 * Process natural language HR queries
 */
router.post('/nlp-query', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        error: 'Query is required',
      });
    }

    const result = await geminiService.processNaturalLanguageHRQuery(query);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('NLP query error:', error);
    res.status(500).json({
      error: 'NLP processing failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

/**
 * GET /api/ai/health
 * Check AI service health and availability
 */
router.get('/health', async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(503).json({
        status: 'unavailable',
        message: 'Gemini API key not configured',
      });
    }

    res.json({
      status: 'ready',
      message: 'Gemini AI service is operational',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'AI service error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
