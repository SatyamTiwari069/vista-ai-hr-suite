import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, requireRole(['admin', 'hr']), async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .insert([req.body])
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
      .from('employees')
      .update(req.body)
      .eq('id', req.params.id)
      .select();
    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/team/:managerId', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)')
      .eq('manager_id', req.params.managerId);
    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
