-- ============================================================================
-- VISTA HRMS - PRODUCTION SEED DATA
-- ============================================================================

-- ============================================================================
-- DEPARTMENTS
-- ============================================================================

INSERT INTO departments (id, name, description, budget) VALUES
('d001', 'Engineering', 'Software Development and Technical Operations', 500000),
('d002', 'Human Resources', 'HR Operations and Talent Management', 200000),
('d003', 'Sales', 'Business Development and Client Relations', 400000),
('d004', 'Marketing', 'Brand and Digital Marketing', 150000),
('d005', 'Finance', 'Finance and Accounting Operations', 180000),
('d006', 'Operations', 'Operations and Supply Chain', 220000)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- USERS (4 Roles: Admin, Senior Manager, HR Recruiter, Employee)
-- ============================================================================

-- ADMIN USER
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, department_id, salary, status) VALUES
('u001', 'admin@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'System', 'Admin', '+1-800-0001', 'admin', NULL, 120000, 'active')
ON CONFLICT DO NOTHING;

-- SENIOR MANAGERS (2)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, department_id, salary, status) VALUES
('u002', 'david.smith@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'David', 'Smith', '+1-800-0002', 'senior_manager', 'd001', 95000, 'active'),
('u003', 'jessica.johnson@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Jessica', 'Johnson', '+1-800-0003', 'senior_manager', 'd003', 90000, 'active')
ON CONFLICT DO NOTHING;

-- HR RECRUITERS (2)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, department_id, salary, status) VALUES
('u004', 'sarah.recruiter@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Sarah', 'Williams', '+1-800-0004', 'hr_recruiter', 'd002', 75000, 'active'),
('u005', 'michael.recruiter@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Michael', 'Brown', '+1-800-0005', 'hr_recruiter', 'd002', 72000, 'active')
ON CONFLICT DO NOTHING;

-- EMPLOYEES (Various Departments - 20 employees for 5000+ scalability demo)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, department_id, manager_id, salary, status) VALUES
('u006', 'john.dev@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'John', 'Davis', '+1-800-0006', 'employee', 'd001', 'u002', 65000, 'active'),
('u007', 'alice.dev@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Alice', 'Martinez', '+1-800-0007', 'employee', 'd001', 'u002', 63000, 'active'),
('u008', 'bob.engineer@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Bob', 'Taylor', '+1-800-0008', 'employee', 'd001', 'u002', 62000, 'active'),
('u009', 'carol.sales@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Carol', 'Anderson', '+1-800-0009', 'employee', 'd003', 'u003', 60000, 'active'),
('u010', 'david.sales@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'David', 'Thomas', '+1-800-0010', 'employee', 'd003', 'u003', 58000, 'active'),
('u011', 'emma.marketing@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Emma', 'Jackson', '+1-800-0011', 'employee', 'd004', 'u003', 55000, 'active'),
('u012', 'frank.finance@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Frank', 'White', '+1-800-0012', 'employee', 'd005', 'u002', 58000, 'active'),
('u013', 'grace.ops@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Grace', 'Harris', '+1-800-0013', 'employee', 'd006', 'u003', 54000, 'active'),
('u014', 'henry.dev@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Henry', 'Martin', '+1-800-0014', 'employee', 'd001', 'u002', 64000, 'active'),
('u015', 'isabella.hr@vista.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lm', 'Isabella', 'Lee', '+1-800-0015', 'employee', 'd002', 'u004', 52000, 'active')
ON CONFLICT DO NOTHING;

-- Update department heads
UPDATE departments SET head_id = 'u002' WHERE id = 'd001';
UPDATE departments SET head_id = 'u004' WHERE id = 'd002';
UPDATE departments SET head_id = 'u003' WHERE id = 'd003';

-- ============================================================================
-- LEAVE BALANCES
-- ============================================================================

INSERT INTO leave_balances (user_id, casual, sick, personal, maternity) 
SELECT id, 12, 10, 5, 0 FROM users WHERE role = 'employee'
ON CONFLICT DO NOTHING;

INSERT INTO leave_balances (user_id, casual, sick, personal, maternity)
VALUES
('u001', 15, 12, 6, 0),
('u002', 15, 12, 6, 0),
('u003', 15, 12, 6, 0),
('u004', 12, 10, 5, 0),
('u005', 12, 10, 5, 0)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- ATTENDANCE RECORDS
-- ============================================================================

INSERT INTO attendance (user_id, date, clock_in, clock_out, location, status) VALUES
('u006', CURRENT_DATE - 5, (CURRENT_DATE - 5)::timestamp + '09:00:00'::time, (CURRENT_DATE - 5)::timestamp + '18:00:00'::time, 'Office', 'present'),
('u006', CURRENT_DATE - 4, (CURRENT_DATE - 4)::timestamp + '09:15:00'::time, (CURRENT_DATE - 4)::timestamp + '18:30:00'::time, 'Office', 'present'),
('u006', CURRENT_DATE - 3, (CURRENT_DATE - 3)::timestamp + '09:00:00'::time, (CURRENT_DATE - 3)::timestamp + '17:00:00'::time, 'Remote', 'present'),
('u006', CURRENT_DATE - 2, (CURRENT_DATE - 2)::timestamp + '08:45:00'::time, (CURRENT_DATE - 2)::timestamp + '17:45:00'::time, 'Office', 'present'),
('u006', CURRENT_DATE - 1, (CURRENT_DATE - 1)::timestamp + '09:30:00'::time, (CURRENT_DATE - 1)::timestamp + '18:15:00'::time, 'Office', 'present'),
('u007', CURRENT_DATE - 3, (CURRENT_DATE - 3)::timestamp + '09:00:00'::time, (CURRENT_DATE - 3)::timestamp + '18:00:00'::time, 'Office', 'present'),
('u007', CURRENT_DATE - 1, (CURRENT_DATE - 1)::timestamp + '09:00:00'::time, NULL, 'Office', 'present'),
('u009', CURRENT_DATE - 2, (CURRENT_DATE - 2)::timestamp + '09:00:00'::time, (CURRENT_DATE - 2)::timestamp + '18:00:00'::time, 'Office', 'present'),
('u010', CURRENT_DATE - 5, (CURRENT_DATE - 5)::timestamp + '09:00:00'::time, (CURRENT_DATE - 5)::timestamp + '18:00:00'::time, 'Remote', 'present')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- LEAVE REQUESTS
-- ============================================================================

INSERT INTO leaves (user_id, leave_type, start_date, end_date, reason, status, approved_by) VALUES
('u006', 'casual', CURRENT_DATE + 10, CURRENT_DATE + 12, 'Personal work', 'approved', 'u002'),
('u007', 'sick', CURRENT_DATE + 3, CURRENT_DATE + 3, 'Medical appointment', 'pending', NULL),
('u009', 'casual', CURRENT_DATE + 20, CURRENT_DATE + 22, 'Vacation', 'approved', 'u003'),
('u010', 'personal', CURRENT_DATE + 15, CURRENT_DATE + 15, 'Personal matters', 'approved', 'u003')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- JOB POSTINGS
-- ============================================================================

INSERT INTO jobs (id, title, description, department, location, salary_min, salary_max, job_type, status, posted_by) VALUES
('j001', 'Senior Full-Stack Engineer', 'Looking for 5+ years experienced engineer in MERN stack and cloud technologies', 'Engineering', 'Remote', 90000, 130000, 'full-time', 'open', 'u004'),
('j002', 'Product Manager', 'Lead product strategy for B2B SaaS platform with strong technical background', 'Engineering', 'Hybrid - New York', 100000, 150000, 'full-time', 'open', 'u004'),
('j003', 'Sales Executive', 'Drive revenue growth with enterprise account management skills', 'Sales', 'Remote', 60000, 100000, 'full-time', 'open', 'u005'),
('j004', 'Digital Marketing Manager', 'Manage digital campaigns and content strategy for company', 'Marketing', 'Office - Boston', 70000, 95000, 'full-time', 'open', 'u005'),
('j005', 'Junior Developer', 'Entry-level position for recent graduates or coding bootcamp graduates', 'Engineering', 'Remote', 50000, 70000, 'full-time', 'open', 'u004')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- CANDIDATES (For AI Resume Screening)
-- ============================================================================

INSERT INTO candidates (id, job_id, first_name, last_name, email, phone, resume_url, status, ai_evaluation_score, ai_evaluation_feedback, applied_date) VALUES
('c001', 'j001', 'Rajesh', 'Kumar', 'rajesh.kumar@email.com', '+91-9876543210', 'https://s3.example.com/resumes/rajesh_kumar.pdf', 'applied', NULL, NULL, CURRENT_TIMESTAMP - INTERVAL '2 days'),
('c002', 'j001', 'Priya', 'Sharma', 'priya.sharma@email.com', '+91-9876543211', 'https://s3.example.com/resumes/priya_sharma.pdf', 'applied', NULL, NULL, CURRENT_TIMESTAMP - INTERVAL '5 days'),
('c003', 'j002', 'Amit', 'Patel', 'amit.patel@email.com', '+91-9876543212', 'https://s3.example.com/resumes/amit_patel.pdf', 'applied', NULL, NULL, CURRENT_TIMESTAMP - INTERVAL '1 day'),
('c004', 'j003', 'Neha', 'Singh', 'neha.singh@email.com', '+91-9876543213', 'https://s3.example.com/resumes/neha_singh.pdf', 'interviewing', 4.2, 'Strong sales background, excellent communication', CURRENT_TIMESTAMP - INTERVAL '3 days'),
('c005', 'j005', 'Vikram', 'Reddy', 'vikram.reddy@email.com', '+91-9876543214', 'https://s3.example.com/resumes/vikram_reddy.pdf', 'applied', NULL, NULL, CURRENT_TIMESTAMP - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- INTERVIEWS SCHEDULED
-- ============================================================================

INSERT INTO interviews (id, candidate_id, interviewer_id, scheduled_date, interview_type, location, status, feedback, rating) VALUES
('int001', 'c004', 'u005', CURRENT_TIMESTAMP + INTERVAL '7 days', 'video', 'Remote', 'scheduled', NULL, NULL)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PAYROLL RECORDS
-- ============================================================================

INSERT INTO payroll (user_id, month, year, base_salary, allowances, deductions, bonus, net_salary, status) VALUES
('u006', 11, 2025, 65000, 5000, 8000, 0, 62000, 'paid'),
('u007', 11, 2025, 63000, 5000, 7800, 0, 60200, 'paid'),
('u009', 11, 2025, 60000, 4000, 7200, 0, 56800, 'pending'),
('u010', 11, 2025, 58000, 4000, 6960, 2000, 57040, 'paid'),
('u012', 11, 2025, 58000, 5000, 7500, 0, 55500, 'paid')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- TRAINING PROGRAMS
-- ============================================================================

INSERT INTO training_programs (id, title, description, department, category, start_date, end_date, duration_hours, max_participants, status) VALUES
('t001', 'Leadership Excellence', 'Develop leadership and management skills for managers', 'Human Resources', 'Management', CURRENT_DATE + 5, CURRENT_DATE + 35, 40, 30, 'scheduled'),
('t002', 'Advanced TypeScript & React', 'Master TypeScript and React for enterprise applications', 'Engineering', 'Technical', CURRENT_DATE, CURRENT_DATE + 20, 30, 20, 'in_progress'),
('t003', 'Sales Excellence Program', 'Improve sales techniques and customer engagement', 'Sales', 'Sales', CURRENT_DATE + 10, CURRENT_DATE + 25, 25, 25, 'scheduled'),
('t004', 'Digital Marketing Trends 2025', 'Latest digital marketing strategies and tools', 'Marketing', 'Marketing', CURRENT_DATE + 15, CURRENT_DATE + 30, 20, 20, 'scheduled')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- TRAINING ENROLLMENTS
-- ============================================================================

INSERT INTO training_enrollments (user_id, training_id, enrollment_status, enrolled_date) VALUES
('u002', 't001', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '5 days'),
('u006', 't002', 'in_progress', CURRENT_TIMESTAMP),
('u007', 't002', 'enrolled', CURRENT_TIMESTAMP),
('u009', 't003', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '2 days'),
('u011', 't004', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '1 day')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PERFORMANCE GOALS
-- ============================================================================

INSERT INTO performance_goals (user_id, goal_title, goal_description, goal_category, target_date, status, progress_percentage) VALUES
('u006', 'Complete 2 Complex Features', 'Deliver 2 enterprise features with full test coverage', 'Technical', CURRENT_DATE + 90, 'in_progress', 40),
('u006', 'Improve Code Quality', 'Increase code coverage to 85%', 'Technical', CURRENT_DATE + 120, 'in_progress', 55),
('u007', 'Lead API Redesign', 'Redesign payment API for better scalability', 'Technical', CURRENT_DATE + 60, 'in_progress', 30),
('u009', 'Close $500K Revenue', 'Close enterprise deals worth $500K', 'Sales', CURRENT_DATE + 90, 'in_progress', 65),
('u010', 'Expand Customer Base', 'Acquire 15 new enterprise clients', 'Sales', CURRENT_DATE + 120, 'in_progress', 45)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PERFORMANCE REVIEWS
-- ============================================================================

INSERT INTO performance_reviews (user_id, reviewer_id, rating, feedback, strengths, areas_for_improvement, review_period_start, review_period_end, status) VALUES
('u006', 'u002', 4.5, 'Excellent technical skills and communication', 'Strong technical expertise, quick learner', 'Time management could be improved', CURRENT_DATE - 90, CURRENT_DATE, 'completed'),
('u007', 'u002', 4.0, 'Solid contributor with good problem-solving', 'Good collaboration, reliable', 'Can take more ownership of projects', CURRENT_DATE - 90, CURRENT_DATE, 'completed'),
('u009', 'u003', 4.2, 'Exceeds expectations in sales', 'Excellent customer engagement, strong closer', 'Needs to improve documentation', CURRENT_DATE - 90, CURRENT_DATE, 'completed')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PROJECTS
-- ============================================================================

INSERT INTO projects (id, title, description, manager_id, department_id, status, start_date, end_date, budget, priority) VALUES
('p001', 'AI-Powered HRMS System', 'Build next-generation HR management system with AI capabilities', 'u002', 'd001', 'active', CURRENT_DATE - 30, CURRENT_DATE + 120, 500000, 'critical'),
('p002', 'Sales Pipeline Automation', 'Automate sales pipeline and customer management', 'u003', 'd003', 'active', CURRENT_DATE - 20, CURRENT_DATE + 90, 250000, 'high'),
('p003', 'Employee Mobile App', 'Develop mobile app for employee self-service', 'u002', 'd001', 'planning', CURRENT_DATE + 10, CURRENT_DATE + 200, 300000, 'high')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- PROJECT TEAM MEMBERS
-- ============================================================================

INSERT INTO project_team_members (project_id, user_id, role) VALUES
('p001', 'u006', 'Lead Developer'),
('p001', 'u007', 'Developer'),
('p001', 'u008', 'Developer'),
('p001', 'u012', 'Finance Consultant'),
('p002', 'u009', 'Lead'),
('p002', 'u010', 'Team Member')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- TASKS
-- ============================================================================

INSERT INTO tasks (project_id, title, description, assigned_to, assigned_by, status, priority, due_date, estimated_hours) VALUES
('p001', 'Setup Database Schema', 'Create production database with all tables and indexes', 'u006', 'u002', 'completed', 'high', CURRENT_DATE - 10, 16),
('p001', 'Implement Authentication', 'JWT-based authentication with role-based access', 'u007', 'u002', 'in_progress', 'high', CURRENT_DATE + 10, 24),
('p001', 'AI Resume Screening', 'Integrate Gemini AI for automated resume evaluation', 'u008', 'u002', 'todo', 'critical', CURRENT_DATE + 20, 40),
('p002', 'Sales Dashboard Design', 'Design and prototype sales dashboard UI', 'u009', 'u003', 'in_progress', 'high', CURRENT_DATE + 5, 20),
('p002', 'CRM Integration', 'Integrate with existing CRM system', 'u010', 'u003', 'todo', 'medium', CURRENT_DATE + 15, 30)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- ANNOUNCEMENTS
-- ============================================================================

INSERT INTO announcements (title, content, author_id, visibility, target_role, priority, expires_at) VALUES
('Company All-Hands Meeting - Q4 Results', 'Join us for our quarterly all-hands meeting this Friday at 2 PM. We''ll discuss Q4 performance, company achievements, and Q1 roadmap.', 'u001', 'all', NULL, 'normal', CURRENT_DATE + 7),
('New Remote Work Policy', 'Effective from January 1, 2025, all employees are eligible for 3 days of remote work per week with manager approval.', 'u004', 'all', NULL, 'high', CURRENT_DATE + 30),
('AI-Powered HR System Launch', 'Our new Vista HRMS with AI capabilities is now live. This will streamline all HR operations including recruitment, performance, and training.', 'u001', 'all', NULL, 'high', CURRENT_DATE + 14),
('Annual Hackathon Registrations Open', 'Sign up for our annual hackathon! Win exciting prizes and showcase your innovation. Limited to first 50 participants.', 'u004', 'specific', 'employee', 'normal', CURRENT_DATE + 10)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- DOCUMENTS
-- ============================================================================

INSERT INTO documents (user_id, title, file_url, file_type, document_category, visibility) VALUES
('u001', 'Company Handbook 2025', 'https://s3.example.com/docs/handbook_2025.pdf', 'pdf', 'policy', 'company'),
('u001', 'Code of Conduct', 'https://s3.example.com/docs/code_of_conduct.pdf', 'pdf', 'policy', 'company'),
('u004', 'Recruitment Guidelines', 'https://s3.example.com/docs/recruitment_guidelines.pdf', 'pdf', 'procedure', 'department'),
('u002', 'Engineering Best Practices', 'https://s3.example.com/docs/engineering_practices.pdf', 'pdf', 'guide', 'department')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
