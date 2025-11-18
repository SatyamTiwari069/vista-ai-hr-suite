import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/apply', authenticateToken, async (req, res, next) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;
    const { data, error } = await supabase
      .from('leaves')
      .insert([{
        employee_id: employeeId,
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        reason,
        status: 'pending',
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/employee/:employeeId', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('leaves')
      .select('*')
      .eq('employee_id', req.params.employeeId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/pending/:managerId', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('leaves')
      .select('*, employees(*)')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.put('/:leaveId/approve', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('leaves')
      .update({ status: 'approved' })
      .eq('id', req.params.leaveId)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:leaveId/reject', authenticateToken, async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('leaves')
      .update({ status: 'rejected' })
      .eq('id', req.params.leaveId)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
