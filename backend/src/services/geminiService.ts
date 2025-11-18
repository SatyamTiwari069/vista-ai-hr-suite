/**
 * VISTA HRMS - GEMINI AI SERVICE
 * ============================================================================
 * Comprehensive AI service for resume screening, job description generation,
 * and intelligent HR conversations using Google Gemini API
 * ============================================================================
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from '../utils/logger.js';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

interface ResumeScreeningResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  recommendation: 'strong_match' | 'good_match' | 'fair_match' | 'not_suitable';
  reasoning: string;
  keySkills: string[];
  recommendedRole: string;
}

interface InterviewPrepResult {
  strengths: string[];
  potentialChallenges: string[];
  recommendedQuestions: string[];
  preparationTips: string[];
}

interface JobDescriptionResult {
  title: string;
  description: string;
  keyResponsibilities: string[];
  requiredSkills: string[];
  preferredSkills: string[];
  salaryRange: {
    min: number;
    max: number;
  };
}

interface HRConversationResult {
  response: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  actionItems?: string[];
  followUpQuestions?: string[];
}

/**
 * Evaluate resume against job requirements using Gemini AI
 * Uses AI to score candidate fit for a position
 */
export async function screenResume(
  resumeText: string,
  jobDescription: string,
  candidateName: string
): Promise<ResumeScreeningResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `You are an expert HR recruitment specialist. Analyze the following resume against the job requirements and provide a detailed evaluation.

CANDIDATE NAME: ${candidateName}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Please provide a JSON response with the following structure (valid JSON only, no markdown):
{
  "score": <number 0-100>,
  "strengths": [<string array of key strengths>],
  "weaknesses": [<string array of areas for improvement>],
  "recommendation": "<strong_match|good_match|fair_match|not_suitable>",
  "reasoning": "<detailed explanation of recommendation>",
  "keySkills": [<array of relevant skills identified>],
  "recommendedRole": "<specific role recommendation>"
}

Evaluate based on:
1. Technical skills match (30%)
2. Experience level alignment (25%)
3. Cultural fit indicators (20%)
4. Education and certifications (15%)
5. Soft skills and achievements (10%)`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const evaluation = JSON.parse(jsonMatch[0]) as ResumeScreeningResult;
    logger.info(`Resume screening completed for ${candidateName} - Score: ${evaluation.score}`);

    return evaluation;
  } catch (error) {
    logger.error('Resume screening error:', error);
    throw new Error(`Resume screening failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate interview preparation tips and recommended questions
 * Uses AI to help interviewers prepare for candidate interviews
 */
export async function generateInterviewPrep(
  candidateBackground: string,
  jobRole: string,
  interviewType: string
): Promise<InterviewPrepResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `You are an expert interviewer and HR consultant. Based on the candidate background and position, create interview preparation materials.

CANDIDATE BACKGROUND:
${candidateBackground}

JOB ROLE: ${jobRole}
INTERVIEW TYPE: ${interviewType}

Please provide a JSON response with the following structure (valid JSON only, no markdown):
{
  "strengths": [<array of candidate's likely strengths to explore>],
  "potentialChallenges": [<array of potential areas to probe>],
  "recommendedQuestions": [<array of 8-10 specific interview questions>],
  "preparationTips": [<array of tips for the interviewer>]
}

Focus on:
1. Behavioral questions
2. Technical depth probing
3. Cultural fit assessment
4. Role-specific scenarios
5. Growth potential evaluation`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const prepMaterials = JSON.parse(jsonMatch[0]) as InterviewPrepResult;
    logger.info(`Interview prep generated for ${jobRole}`);

    return prepMaterials;
  } catch (error) {
    logger.error('Interview prep generation error:', error);
    throw new Error(`Interview prep generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate comprehensive job descriptions with AI
 * Uses AI to create detailed, attractive job postings
 */
export async function generateJobDescription(
  jobTitle: string,
  departmentContext: string,
  companyInfo: string,
  requiredExperience: string,
  salary: { min: number; max: number }
): Promise<JobDescriptionResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `You are an expert job description writer for tech companies. Create a compelling and comprehensive job description.

JOB TITLE: ${jobTitle}
DEPARTMENT: ${departmentContext}
COMPANY INFO: ${companyInfo}
REQUIRED EXPERIENCE: ${requiredExperience}
SALARY RANGE: $${salary.min} - $${salary.max}

Please provide a JSON response with the following structure (valid JSON only, no markdown):
{
  "title": "<optimized job title>",
  "description": "<2-3 paragraph compelling job description>",
  "keyResponsibilities": [<array of 6-8 key responsibilities>],
  "requiredSkills": [<array of required technical and soft skills>],
  "preferredSkills": [<array of nice-to-have skills>],
  "salaryRange": {
    "min": ${salary.min},
    "max": ${salary.max}
  }
}

Make it:
1. Attractive to top talent
2. Clear about expectations
3. Emphasize growth opportunities
4. Include company culture highlights
5. Professional yet engaging tone`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const jobDesc = JSON.parse(jsonMatch[0]) as JobDescriptionResult;
    logger.info(`Job description generated for ${jobTitle}`);

    return jobDesc;
  } catch (error) {
    logger.error('Job description generation error:', error);
    throw new Error(`Job description generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Provide intelligent HR conversation response
 * Uses AI for employee queries and HR support chatbot
 */
export async function generateHRResponse(
  userQuery: string,
  context: {
    employeeRole?: string;
    department?: string;
    previousContext?: string;
  }
): Promise<HRConversationResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const contextStr = context.previousContext
      ? `Previous conversation:\n${context.previousContext}\n\n`
      : '';

    const prompt = `You are an intelligent HR Assistant for a modern tech company. Help employees with HR-related queries with empathy and professionalism.

${contextStr}EMPLOYEE ROLE: ${context.employeeRole || 'Not specified'}
DEPARTMENT: ${context.department || 'Not specified'}

EMPLOYEE QUERY:
"${userQuery}"

Provide a helpful, professional response. Follow up with relevant questions if needed.

Your response format should be JSON (valid JSON only, no markdown):
{
  "response": "<your helpful HR response>",
  "sentiment": "<positive|neutral|negative>",
  "actionItems": [<array of action items if applicable>],
  "followUpQuestions": [<array of follow-up questions to clarify needs>]
}

Guidelines:
1. Be empathetic and professional
2. Provide accurate HR policy information
3. Escalate complex issues appropriately
4. Ask clarifying questions when needed
5. Suggest resources when appropriate`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const hrResponse = JSON.parse(jsonMatch[0]) as HRConversationResult;
    logger.info(`HR conversation response generated for query: "${userQuery.substring(0, 50)}..."`);

    return hrResponse;
  } catch (error) {
    logger.error('HR conversation error:', error);
    throw new Error(`HR conversation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Analyze performance review content with AI
 * Generates structured insights from performance reviews
 */
export async function analyzePerformanceReview(
  employeeName: string,
  reviewContent: string,
  role: string,
  department: string
): Promise<{
  strengths: string[];
  areasForImprovement: string[];
  developmentPlan: string[];
  nextStepRecommendations: string[];
  overallAssessment: string;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Analyze this employee performance review and provide structured insights.

EMPLOYEE: ${employeeName}
ROLE: ${role}
DEPARTMENT: ${department}

REVIEW CONTENT:
${reviewContent}

Provide JSON response (valid JSON only, no markdown):
{
  "strengths": [<array of identified strengths>],
  "areasForImprovement": [<array of improvement areas>],
  "developmentPlan": [<array of specific development recommendations>],
  "nextStepRecommendations": [<array of career progression recommendations>],
  "overallAssessment": "<summary assessment>"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    logger.info(`Performance review analyzed for ${employeeName}`);

    return analysis;
  } catch (error) {
    logger.error('Performance review analysis error:', error);
    throw new Error(`Performance analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generate personalized training recommendations
 * Uses AI to recommend training based on employee profile and goals
 */
export async function generateTrainingRecommendations(
  employeeName: string,
  currentRole: string,
  skills: string[],
  goals: string[],
  performanceReview: string
): Promise<{
  recommendedCourses: Array<{
    title: string;
    reason: string;
    estimatedHours: number;
    priority: 'high' | 'medium' | 'low';
  }>;
  skillGaps: string[];
  careerPath: string;
  estimatedCompletionTime: string;
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Generate personalized training recommendations for an employee.

EMPLOYEE: ${employeeName}
CURRENT ROLE: ${currentRole}
CURRENT SKILLS: ${skills.join(', ')}
CAREER GOALS: ${goals.join(', ')}
PERFORMANCE REVIEW: ${performanceReview}

Provide JSON response (valid JSON only, no markdown):
{
  "recommendedCourses": [
    {
      "title": "<course title>",
      "reason": "<why this course>",
      "estimatedHours": <number>,
      "priority": "<high|medium|low>"
    }
  ],
  "skillGaps": [<identified skill gaps>],
  "careerPath": "<recommended career progression>",
  "estimatedCompletionTime": "<timeline for skill development>"
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const recommendations = JSON.parse(jsonMatch[0]);
    logger.info(`Training recommendations generated for ${employeeName}`);

    return recommendations;
  } catch (error) {
    logger.error('Training recommendations error:', error);
    throw new Error(`Training recommendations failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Process voice/text input for HR queries
 * Handles natural language processing for HR assistance
 */
export async function processNaturalLanguageHRQuery(
  query: string
): Promise<{
  intent: string;
  confidence: number;
  response: string;
  suggestedActions: string[];
}> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `Process this HR-related natural language query and identify the intent.

QUERY: "${query}"

Provide JSON response (valid JSON only, no markdown):
{
  "intent": "<identified HR intent: leave_request|attendance|salary|training|performance|recruitment|other>",
  "confidence": <0-1 confidence score>,
  "response": "<appropriate response to the query>",
  "suggestedActions": [<array of suggested follow-up actions>]
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse AI response');
    }

    const nlpResult = JSON.parse(jsonMatch[0]);
    logger.info(`NLP processing completed - Intent: ${nlpResult.intent}`);

    return nlpResult;
  } catch (error) {
    logger.error('NLP processing error:', error);
    throw new Error(`NLP processing failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default {
  screenResume,
  generateInterviewPrep,
  generateJobDescription,
  generateHRResponse,
  analyzePerformanceReview,
  generateTrainingRecommendations,
  processNaturalLanguageHRQuery,
};
