import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { mockDataService } from '../services/mockDataService.js';

const router = Router();

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select('*, users(*)');
    
    // Fallback to mock data in development if database fails
    if (error || !data) {
      if (process.env.NODE_ENV === 'development') {
        return res.json(mockDataService.getEmployees());
      }
      throw error;
    }
    res.json(data);
  } catch (error) {
    // Development fallback
    if (process.env.NODE_ENV === 'development') {
      return res.json(mockDataService.getEmployees());
    }
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
    
    // Fallback to mock data in development
    if (error || !data) {
      if (process.env.NODE_ENV === 'development') {
        const mockData = mockDataService.getEmployee(req.params.id);
        if (mockData) return res.json(mockData);
        return res.status(404).json({ error: 'Employee not found' });
      }
      throw error;
    }
    res.json(data);
  } catch (error) {
    // Development fallback
    if (process.env.NODE_ENV === 'development') {
      const mockData = mockDataService.getEmployee(req.params.id);
      if (mockData) return res.json(mockData);
      return res.status(404).json({ error: 'Employee not found' });
    }
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
