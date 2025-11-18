import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { mockDataService } from '../services/mockDataService.js';

const router = Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { jobId } = req.query;
    let query = supabase.from('candidates').select('*');
    if (jobId) query = query.eq('job_id', jobId);
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error || !data) {
      if (process.env.NODE_ENV === 'development') {
        return res.json(mockDataService.getCandidates());
      }
      throw error;
    }
    res.json(data);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      return res.json(mockDataService.getCandidates());
    }
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error || !data) {
      if (process.env.NODE_ENV === 'development') {
        const mockData = mockDataService.getCandidate(req.params.id);
        if (mockData) return res.json(mockData);
        return res.status(404).json({ error: 'Candidate not found' });
      }
      throw error;
    }
    res.json(data);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      const mockData = mockDataService.getCandidate(req.params.id);
      if (mockData) return res.json(mockData);
      return res.status(404).json({ error: 'Candidate not found' });
    }
    next(error);
  }
});

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .insert([{ ...req.body, created_at: new Date().toISOString() }])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('candidates')
      .update(req.body)
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/status', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('candidates')
      .update({ status })
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/score', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { aiScore } = req.body;
    const { data, error } = await supabase
      .from('candidates')
      .update({ ai_score: aiScore })
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
