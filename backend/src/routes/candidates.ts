import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { jobId } = req.query;
    let query = supabase.from('candidates').select('*');
    if (jobId) query = query.eq('job_id', jobId);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
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
    if (error) throw error;
    res.json(data);
  } catch (error) {
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
