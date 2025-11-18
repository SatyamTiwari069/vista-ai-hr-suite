import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';
import { mockDataService } from './mockDataService.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

export const interviewService = {
  // Create interview schedule
  async scheduleInterview(interview: any) {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .insert([{
          candidate_id: interview.candidateId,
          job_id: interview.jobId,
          interviewer_id: interview.interviewerId,
          scheduled_date: interview.scheduledDate,
          interview_time: interview.interviewTime,
          interview_type: interview.interviewType || 'technical',
          location: interview.location || 'Virtual',
          status: 'scheduled',
          notes: interview.notes || '',
          created_at: new Date().toISOString(),
        }])
        .select();

      if (error) throw error;
      logger.info(`Interview scheduled for candidate: ${interview.candidateId}`);
      return data?.[0];
    } catch (error: any) {
      logger.error('Schedule interview error:', error);
      return {
        id: `int_${Date.now()}`,
        ...interview,
        status: 'scheduled',
        created_at: new Date().toISOString(),
      };
    }
  },

  // Get interviews for a candidate
  async getCandidateInterviews(candidateId: string) {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .select('*, candidates(*), jobs(*), users(*)')
        .eq('candidate_id', candidateId)
        .order('scheduled_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      logger.error('Get candidate interviews error:', error);
      return [];
    }
  },

  // Get interviews for an interviewer
  async getInterviewerSchedule(interviewerId: string, startDate?: string, endDate?: string) {
    try {
      let query = supabase
        .from('interviews')
        .select('*, candidates(*), jobs(*)')
        .eq('interviewer_id', interviewerId);

      if (startDate) {
        query = query.gte('scheduled_date', startDate);
      }
      if (endDate) {
        query = query.lte('scheduled_date', endDate);
      }

      const { data, error } = await query.order('scheduled_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      logger.error('Get interviewer schedule error:', error);
      return [];
    }
  },

  // Get all upcoming interviews
  async getUpcomingInterviews(days: number = 7) {
    try {
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from('interviews')
        .select('*, candidates(*), jobs(*), users(*)')
        .gte('scheduled_date', startDate.toISOString())
        .lte('scheduled_date', endDate.toISOString())
        .eq('status', 'scheduled')
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error: any) {
      logger.error('Get upcoming interviews error:', error);
      return [];
    }
  },

  // Update interview status
  async updateInterviewStatus(interviewId: string, status: string, result?: any) {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update({
          status,
          result: result || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', interviewId)
        .select();

      if (error) throw error;
      logger.info(`Interview ${interviewId} status updated to: ${status}`);
      return data?.[0];
    } catch (error: any) {
      logger.error('Update interview status error:', error);
      return { id: interviewId, status, result: result || null };
    }
  },

  // Reschedule interview
  async rescheduleInterview(interviewId: string, newDate: string, newTime: string) {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update({
          scheduled_date: newDate,
          interview_time: newTime,
          updated_at: new Date().toISOString(),
        })
        .eq('id', interviewId)
        .select();

      if (error) throw error;
      logger.info(`Interview ${interviewId} rescheduled`);
      return data?.[0];
    } catch (error: any) {
      logger.error('Reschedule interview error:', error);
      return { id: interviewId, scheduled_date: newDate, interview_time: newTime };
    }
  },

  // Add interview feedback
  async addInterviewFeedback(interviewId: string, feedback: {
    rating: number;
    technicalSkills: number;
    communicationSkills: number;
    comments: string;
    recommendation: string;
  }) {
    try {
      const { data, error } = await supabase
        .from('interview_feedback')
        .insert([{
          interview_id: interviewId,
          rating: feedback.rating,
          technical_skills: feedback.technicalSkills,
          communication_skills: feedback.communicationSkills,
          comments: feedback.comments,
          recommendation: feedback.recommendation,
          created_at: new Date().toISOString(),
        }])
        .select();

      if (error) throw error;
      logger.info(`Feedback added for interview: ${interviewId}`);
      return data?.[0];
    } catch (error: any) {
      logger.error('Add interview feedback error:', error);
      return {
        id: `fb_${Date.now()}`,
        interview_id: interviewId,
        ...feedback,
        created_at: new Date().toISOString(),
      };
    }
  },

  // Get interview feedback
  async getInterviewFeedback(interviewId: string) {
    try {
      const { data, error } = await supabase
        .from('interview_feedback')
        .select('*')
        .eq('interview_id', interviewId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error: any) {
      logger.error('Get interview feedback error:', error);
      return null;
    }
  },

  // Get interview statistics
  async getInterviewStats(jobId?: string) {
    try {
      let query = supabase.from('interviews').select('status, result');

      if (jobId) {
        query = query.eq('job_id', jobId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return {
        totalInterviews: data?.length || 0,
        scheduled: data?.filter((i: any) => i.status === 'scheduled').length || 0,
        completed: data?.filter((i: any) => i.status === 'completed').length || 0,
        cancelled: data?.filter((i: any) => i.status === 'cancelled').length || 0,
        selected: data?.filter((i: any) => i.result === 'selected').length || 0,
        rejected: data?.filter((i: any) => i.result === 'rejected').length || 0,
      };
    } catch (error: any) {
      logger.error('Get interview stats error:', error);
      return {
        totalInterviews: 0,
        scheduled: 0,
        completed: 0,
        cancelled: 0,
        selected: 0,
        rejected: 0,
      };
    }
  },

  // Cancel interview
  async cancelInterview(interviewId: string, reason?: string) {
    try {
      const { data, error } = await supabase
        .from('interviews')
        .update({
          status: 'cancelled',
          cancellation_reason: reason,
          updated_at: new Date().toISOString(),
        })
        .eq('id', interviewId)
        .select();

      if (error) throw error;
      logger.info(`Interview ${interviewId} cancelled`);
      return data?.[0];
    } catch (error: any) {
      logger.error('Cancel interview error:', error);
      return { id: interviewId, status: 'cancelled', cancellation_reason: reason };
    }
  },
};
