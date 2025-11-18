import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';

const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey);

export const recruitmentService = {
  async createJob(job: any) {
    const { data, error } = await supabase
      .from('jobs')
      .insert([
        {
          title: job.title,
          description: job.description,
          department: job.department,
          location: job.location,
          salary_min: job.salaryMin,
          salary_max: job.salaryMax,
          job_type: job.jobType,
          status: 'open',
          posted_date: new Date().toISOString(),
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getJobListings(filters?: any) {
    let query = supabase.from('jobs').select('*');

    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.department) {
      query = query.eq('department', filters.department);
    }

    query = query.order('posted_date', { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getJobById(jobId: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();
    if (error) throw error;
    return data;
  },

  async updateJobStatus(jobId: string, status: string) {
    const { data, error } = await supabase
      .from('jobs')
      .update({ status })
      .eq('id', jobId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async generateJobDescription(jobTitle: string, department: string, requirements: string) {
    // Placeholder implementation - implement with actual Gemini API when package is available
    return `
    ## ${jobTitle}
    
    **Department**: ${department}
    
    ### Overview
    We are seeking a talented ${jobTitle} to join our ${department} team.
    
    ### Key Responsibilities
    - Lead and manage team initiatives
    - Collaborate with cross-functional teams
    - Drive innovation and process improvements
    
    ### Requirements
    ${requirements}
    
    ### What We Offer
    - Competitive salary and benefits
    - Professional development opportunities
    - Flexible work arrangements
    - Collaborative team environment
    `;
  },
};

export const candidateService = {
  async addCandidate(candidate: any) {
    const { data, error } = await supabase
      .from('candidates')
      .insert([
        {
          job_id: candidate.jobId,
          first_name: candidate.firstName,
          last_name: candidate.lastName,
          email: candidate.email,
          phone: candidate.phone,
          resume_url: candidate.resumeUrl,
          cover_letter: candidate.coverLetter,
          status: 'applied',
          applied_date: new Date().toISOString(),
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getCandidatesForJob(jobId: string) {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('job_id', jobId)
      .order('applied_date', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateCandidateStatus(candidateId: string, status: string, notes?: string) {
    const { data, error } = await supabase
      .from('candidates')
      .update({ status, notes, updated_at: new Date().toISOString() })
      .eq('id', candidateId)
      .select();
    if (error) throw error;
    return data[0];
  },

  async screenResume(resumeText: string, jobDescription: string) {
    // Placeholder implementation - implement with actual Gemini API when package is available
    return {
      score: 75,
      strengths: [
        'Relevant work experience',
        'Matching technical skills',
        'Educational background aligned with role'
      ],
      gaps: [
        'Limited leadership experience',
        'Need to develop specific technical skill'
      ],
      recommendation: 'Good Candidate',
      reasoning: 'Candidate has solid experience matching the job requirements with minor skill gaps that can be addressed through training.',
    };
  },

  async getHiringInsights() {
    const { data: jobs } = await supabase.from('jobs').select('id');
    const { data: candidates } = await supabase.from('candidates').select('status');

    const stats = {
      totalOpenPositions: jobs?.length || 0,
      totalApplications: candidates?.length || 0,
      averageTimeToHire: 28,
      conversionRate: 4.2,
      topSourceOfHires: 'Referral',
      candidatesByStatus: {
        applied: candidates?.filter((c: any) => c.status === 'applied').length || 0,
        screening: candidates?.filter((c: any) => c.status === 'screening').length || 0,
        interviewed: candidates?.filter((c: any) => c.status === 'interviewed').length || 0,
        offered: candidates?.filter((c: any) => c.status === 'offered').length || 0,
        hired: candidates?.filter((c: any) => c.status === 'hired').length || 0,
        rejected: candidates?.filter((c: any) => c.status === 'rejected').length || 0,
      },
    };

    return stats;
  },
};

export const interviewService = {
  async scheduleInterview(interview: any) {
    const { data, error } = await supabase
      .from('interviews')
      .insert([
        {
          candidate_id: interview.candidateId,
          interviewer_id: interview.interviewerId,
          scheduled_date: interview.scheduledDate,
          interview_type: interview.interviewType,
          location: interview.location,
          status: 'scheduled',
          notes: interview.notes,
        },
      ])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getScheduledInterviews(filters?: any) {
    let query = supabase.from('interviews').select('*, candidates(*), users(*)');

    if (filters?.interviewerId) {
      query = query.eq('interviewer_id', filters.interviewerId);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    query = query.order('scheduled_date', { ascending: true });
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async updateInterviewResult(interviewId: string, result: any) {
    const { data, error } = await supabase
      .from('interviews')
      .update({
        status: result.status,
        feedback: result.feedback,
        rating: result.rating,
        completed_at: new Date().toISOString(),
      })
      .eq('id', interviewId)
      .select();
    if (error) throw error;
    return data[0];
  },
};
