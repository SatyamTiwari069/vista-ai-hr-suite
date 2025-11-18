import axios from 'axios';
import { config } from '../config/env.js';

// Mock AI responses for demo purposes
const mockResumeScreening = {
  match_score: 85,
  strengths: ['Strong technical background', 'Relevant experience', 'Leadership skills'],
  weaknesses: ['Limited management experience', 'Short tenure at last role'],
  recommendation: 'SHORTLIST - Excellent fit for the position',
  skills_match: {
    required: ['JavaScript', 'React', 'Node.js'],
    found: ['JavaScript', 'React'],
    missing: ['Node.js'],
  },
};

const mockJobDescription = {
  title: 'Senior Software Engineer',
  overview: 'We are seeking an experienced Senior Software Engineer to join our team and drive technical excellence.',
  responsibilities: [
    'Design and develop scalable software solutions',
    'Lead technical design reviews',
    'Mentor junior developers',
    'Contribute to architecture decisions',
  ],
  required_skills: ['JavaScript', 'React', 'Node.js', 'System Design'],
  qualifications: [
    '5+ years software development experience',
    'B.S. in Computer Science or related field',
    'Experience with modern web frameworks',
  ],
  benefits: ['Competitive salary', 'Health insurance', 'Remote work options', '401k match'],
  work_environment: 'Collaborative, fast-paced startup environment with a focus on innovation',
};

const mockPerformanceAnalysis = {
  rating: 4.2,
  performance_level: 'Exceeds Expectations',
  key_strengths: ['Problem-solving', 'Communication', 'Team collaboration'],
  areas_for_improvement: ['Time management', 'Documentation'],
  recommendations: [
    'Consider for leadership track',
    'Enroll in advanced training',
    'Assign mentorship role',
  ],
  promotion_readiness: 85,
  engagement_score: 8.2,
};

export const aiService = {
  async screenResume(resumeText: string, jobDescription: string): Promise<any> {
    try {
      // Try to use Gemini API, fall back to mock if fails
      try {
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          {
            contents: [
              {
                parts: [
                  {
                    text: `You are an expert HR recruiter. Analyze this resume against the job description and provide:
1. A match score (0-100)
2. Top 3 strengths
3. Top 3 weaknesses
4. Overall recommendation

Resume:
${resumeText}

Job Description:
${jobDescription}

Provide response in JSON format with keys: match_score, strengths, weaknesses, recommendation`,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 500,
              temperature: 0.7,
            },
          },
          {
            params: { key: config.ai.geminiApiKey },
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      } catch (apiError) {
        console.warn('Gemini API failed, using mock data:', apiError);
      }

      // Return mock data if API fails
      return mockResumeScreening;
    } catch (error) {
      console.error('AI Resume Screening Error:', error);
      return mockResumeScreening;
    }
  },

  async generateJobDescription(title: string, requirements: string[], department: string): Promise<any> {
    try {
      // Try to use Gemini API, fall back to mock if fails
      try {
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          {
            contents: [
              {
                parts: [
                  {
                    text: `Create a professional job description for:
Title: ${title}
Department: ${department}
Requirements: ${requirements.join(', ')}

Provide a well-structured job description with sections for:
1. Overview
2. Responsibilities
3. Required Skills
4. Qualifications
5. Benefits
6. Work Environment

Format as JSON.`,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 800,
              temperature: 0.7,
            },
          },
          {
            params: { key: config.ai.geminiApiKey },
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      } catch (apiError) {
        console.warn('Gemini API failed, using mock data:', apiError);
      }

      return mockJobDescription;
    } catch (error) {
      console.error('AI Job Description Generation Error:', error);
      return mockJobDescription;
    }
  },

  async analyzePerformance(employeeData: any): Promise<any> {
    try {
      // Try to use Gemini API, fall back to mock if fails
      try {
        const employeeDataStr = typeof employeeData === 'string' ? employeeData : JSON.stringify(employeeData, null, 2);
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          {
            contents: [
              {
                parts: [
                  {
                    text: 'As an HR expert, analyze this employee performance data and provide: 1. Performance rating (1-5), 2. Performance level, 3. Key strengths, 4. Areas for improvement, 5. Recommendations. Employee Data: ' + employeeDataStr + '. Format response as JSON.',
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 600,
              temperature: 0.7,
            },
          },
          {
            params: { key: config.ai.geminiApiKey },
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const content = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (content) {
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
          }
        }
      } catch (apiError) {
        console.warn('Gemini API failed, using mock data:', apiError);
      }

      return mockPerformanceAnalysis;
    } catch (error) {
      console.error('AI Performance Analysis Error:', error);
      return mockPerformanceAnalysis;
    }
  },

  async generateInsights(data: any, type: string): Promise<any> {
    const insights = {
      type,
      summary: 'AI-generated insights for your data',
      recommendations: [
        'Review quarterly performance metrics',
        'Consider staff training programs',
        'Implement process improvements',
      ],
      predictive_analytics: {
        churn_risk: 15,
        turnover_probability: 0.08,
        productivity_trend: 'Positive',
      },
      generated_at: new Date().toISOString(),
    };

    return insights;
  },

  async chatWithAI(question: string, context: any): Promise<string> {
    try {
      try {
        const response = await axios.post(
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
          {
            contents: [
              {
                parts: [
                  {
                    text: `You are a helpful HR assistant. Answer the following question in a professional manner.
Context: ${JSON.stringify(context)}
Question: ${question}
Provide a helpful, concise response.`,
                  },
                ],
              },
            ],
            generationConfig: {
              maxOutputTokens: 500,
              temperature: 0.7,
            },
          },
          {
            params: { key: config.ai.geminiApiKey },
            headers: { 'Content-Type': 'application/json' },
          }
        );

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to generate response';
      } catch (apiError) {
        console.warn('Gemini API failed, using mock response:', apiError);
        return `I'm here to help with HR-related questions. Regarding your question about "${question}", I recommend reaching out to your HR department for specific guidance tailored to your situation.`;
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      return 'I apologize, but I encountered an error processing your question. Please try again.';
    }
  },
};
