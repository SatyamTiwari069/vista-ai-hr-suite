-- Vista HRMS - Demo Data Seeding

-- Insert Departments
INSERT INTO departments (id, name, description, budget) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'Engineering', 'Software Development and Engineering', 500000),
  ('d1000000-0000-0000-0000-000000000002', 'Human Resources', 'HR and People Operations', 200000),
  ('d1000000-0000-0000-0000-000000000003', 'Sales', 'Sales and Business Development', 300000),
  ('d1000000-0000-0000-0000-000000000004', 'Marketing', 'Marketing and Communications', 150000),
  ('d1000000-0000-0000-0000-000000000005', 'Finance', 'Finance and Accounting', 180000)
ON CONFLICT DO NOTHING;

-- Insert Users (with password hashes - these are bcrypt hashes for "password123")
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, role, department_id, salary, status) VALUES
  -- Admin
  ('u1000000-0000-0000-0000-000000000001', 'admin@vista.com', '$2b$10$YourHashedPasswordAdmin', 'Admin', 'User', '+1-555-0001', 'admin', NULL, 100000, 'active'),
  
  -- HR Team
  ('u1000000-0000-0000-0000-000000000002', 'hr@vista.com', '$2b$10$YourHashedPasswordHR', 'Sarah', 'Johnson', '+1-555-0002', 'hr', 'd1000000-0000-0000-0000-000000000002', 75000, 'active'),
  ('u1000000-0000-0000-0000-000000000003', 'hr.manager@vista.com', '$2b$10$YourHashedPassword', 'Michael', 'Chen', '+1-555-0003', 'hr', 'd1000000-0000-0000-0000-000000000002', 65000, 'active'),
  
  -- Engineering Team
  ('u1000000-0000-0000-0000-000000000004', 'manager@vista.com', '$2b$10$YourHashedPassword', 'David', 'Smith', '+1-555-0004', 'manager', 'd1000000-0000-0000-0000-000000000001', 85000, 'active'),
  ('u1000000-0000-0000-0000-000000000005', 'employee@vista.com', '$2b$10$YourHashedPassword', 'Emily', 'Davis', '+1-555-0005', 'employee', 'd1000000-0000-0000-0000-000000000001', 65000, 'active'),
  ('u1000000-0000-0000-0000-000000000006', 'john.dev@vista.com', '$2b$10$YourHashedPassword', 'John', 'Wilson', '+1-555-0006', 'employee', 'd1000000-0000-0000-0000-000000000001', 62000, 'active'),
  ('u1000000-0000-0000-0000-000000000007', 'alice.dev@vista.com', '$2b$10$YourHashedPassword', 'Alice', 'Brown', '+1-555-0007', 'employee', 'd1000000-0000-0000-0000-000000000001', 62000, 'active'),
  
  -- Sales Team
  ('u1000000-0000-0000-0000-000000000008', 'sales.manager@vista.com', '$2b$10$YourHashedPassword', 'Robert', 'Garcia', '+1-555-0008', 'manager', 'd1000000-0000-0000-0000-000000000003', 80000, 'active'),
  ('u1000000-0000-0000-0000-000000000009', 'james.sales@vista.com', '$2b$10$YourHashedPassword', 'James', 'Martinez', '+1-555-0009', 'employee', 'd1000000-0000-0000-0000-000000000003', 60000, 'active'),
  ('u1000000-0000-0000-0000-000000000010', 'lucy.sales@vista.com', '$2b$10$YourHashedPassword', 'Lucy', 'Rodriguez', '+1-555-0010', 'employee', 'd1000000-0000-0000-0000-000000000003', 60000, 'active'),
  
  -- Marketing Team
  ('u1000000-0000-0000-0000-000000000011', 'marketing.manager@vista.com', '$2b$10$YourHashedPassword', 'Jessica', 'Taylor', '+1-555-0011', 'manager', 'd1000000-0000-0000-0000-000000000004', 75000, 'active'),
  ('u1000000-0000-0000-0000-000000000012', 'mark.marketing@vista.com', '$2b$10$YourHashedPassword', 'Mark', 'Anderson', '+1-555-0012', 'employee', 'd1000000-0000-0000-0000-000000000004', 55000, 'active'),
  
  -- Finance Team
  ('u1000000-0000-0000-0000-000000000013', 'finance.manager@vista.com', '$2b$10$YourHashedPassword', 'Patricia', 'Thomas', '+1-555-0013', 'manager', 'd1000000-0000-0000-0000-000000000005', 78000, 'active'),
  ('u1000000-0000-0000-0000-000000000014', 'kevin.finance@vista.com', '$2b$10$YourHashedPassword', 'Kevin', 'Jackson', '+1-555-0014', 'employee', 'd1000000-0000-0000-0000-000000000005', 58000, 'active')
ON CONFLICT DO NOTHING;

-- Update department heads
UPDATE departments SET head_id = 'u1000000-0000-0000-0000-000000000004' WHERE id = 'd1000000-0000-0000-0000-000000000001';
UPDATE departments SET head_id = 'u1000000-0000-0000-0000-000000000002' WHERE id = 'd1000000-0000-0000-0000-000000000002';
UPDATE departments SET head_id = 'u1000000-0000-0000-0000-000000000008' WHERE id = 'd1000000-0000-0000-0000-000000000003';
UPDATE departments SET head_id = 'u1000000-0000-0000-0000-000000000011' WHERE id = 'd1000000-0000-0000-0000-000000000004';
UPDATE departments SET head_id = 'u1000000-0000-0000-0000-000000000013' WHERE id = 'd1000000-0000-0000-0000-000000000005';

-- Insert Leave Balances for all employees
INSERT INTO leave_balances (user_id, casual, sick, personal, maternity) VALUES
  ('u1000000-0000-0000-0000-000000000001', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000002', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000003', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000004', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000005', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000006', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000007', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000008', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000009', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000010', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000011', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000012', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000013', 12, 10, 5, 0),
  ('u1000000-0000-0000-0000-000000000014', 12, 10, 5, 0)
ON CONFLICT DO NOTHING;

-- Insert Sample Attendance Records
INSERT INTO attendance (user_id, date, clock_in, clock_out, location, status) VALUES
  ('u1000000-0000-0000-0000-000000000005', CURRENT_DATE - 5, CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '8 hours', CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '17 hours', 'Office', 'present'),
  ('u1000000-0000-0000-0000-000000000005', CURRENT_DATE - 4, CURRENT_TIMESTAMP - INTERVAL '4 days' + INTERVAL '8 hours', CURRENT_TIMESTAMP - INTERVAL '4 days' + INTERVAL '17 hours', 'Office', 'present'),
  ('u1000000-0000-0000-0000-000000000005', CURRENT_DATE - 3, CURRENT_TIMESTAMP - INTERVAL '3 days' + INTERVAL '8 hours', CURRENT_TIMESTAMP - INTERVAL '3 days' + INTERVAL '17 hours', 'Office', 'present'),
  ('u1000000-0000-0000-0000-000000000005', CURRENT_DATE - 2, CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '8 hours', CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '17 hours', 'Office', 'present'),
  ('u1000000-0000-0000-0000-000000000005', CURRENT_DATE - 1, CURRENT_TIMESTAMP - INTERVAL '1 day' + INTERVAL '8 hours', CURRENT_TIMESTAMP - INTERVAL '1 day' + INTERVAL '17 hours', 'Office', 'present'),
  ('u1000000-0000-0000-0000-000000000006', CURRENT_DATE - 3, CURRENT_TIMESTAMP - INTERVAL '3 days' + INTERVAL '8 hours', CURRENT_TIMESTAMP - INTERVAL '3 days' + INTERVAL '17 hours', 'Remote', 'present'),
  ('u1000000-0000-0000-0000-000000000009', CURRENT_DATE - 2, CURRENT_TIMESTAMP - INTERVAL '2 days' + INTERVAL '8 hours', NULL, 'Office', 'present')
ON CONFLICT DO NOTHING;

-- Insert Sample Leave Requests
INSERT INTO leaves (user_id, leave_type, start_date, end_date, reason, status, approved_by) VALUES
  ('u1000000-0000-0000-0000-000000000005', 'casual', CURRENT_DATE + 10, CURRENT_DATE + 12, 'Personal work', 'approved', 'u1000000-0000-0000-0000-000000000004'),
  ('u1000000-0000-0000-0000-000000000006', 'sick', CURRENT_DATE + 15, CURRENT_DATE + 15, 'Medical appointment', 'pending', NULL),
  ('u1000000-0000-0000-0000-000000000009', 'casual', CURRENT_DATE + 20, CURRENT_DATE + 22, 'Vacation', 'approved', 'u1000000-0000-0000-0000-000000000008')
ON CONFLICT DO NOTHING;

-- Insert Sample Jobs
INSERT INTO jobs (id, title, description, department, location, salary_min, salary_max, job_type, status) VALUES
  ('j1000000-0000-0000-0000-000000000001', 'Senior Software Engineer', 'Looking for experienced software engineers with 5+ years experience in full-stack development', 'Engineering', 'New York, NY', 90000, 130000, 'Full-time', 'open'),
  ('j1000000-0000-0000-0000-000000000002', 'Product Manager', 'Lead product strategy and roadmap for our cloud platform', 'Engineering', 'San Francisco, CA', 100000, 150000, 'Full-time', 'open'),
  ('j1000000-0000-0000-0000-000000000003', 'Sales Executive', 'Drive sales growth for our enterprise solutions', 'Sales', 'Remote', 60000, 100000, 'Full-time', 'open'),
  ('j1000000-0000-0000-0000-000000000004', 'Marketing Manager', 'Manage marketing campaigns and brand strategy', 'Marketing', 'Boston, MA', 70000, 95000, 'Full-time', 'open')
ON CONFLICT DO NOTHING;

-- Insert Sample Candidates
INSERT INTO candidates (job_id, first_name, last_name, email, phone, status, applied_date) VALUES
  ('j1000000-0000-0000-0000-000000000001', 'Rajesh', 'Kumar', 'rajesh.kumar@email.com', '+1-555-0101', 'applied', CURRENT_TIMESTAMP - INTERVAL '2 days'),
  ('j1000000-0000-0000-0000-000000000001', 'Priya', 'Sharma', 'priya.sharma@email.com', '+1-555-0102', 'interview', CURRENT_TIMESTAMP - INTERVAL '5 days'),
  ('j1000000-0000-0000-0000-000000000002', 'Amit', 'Patel', 'amit.patel@email.com', '+1-555-0103', 'applied', CURRENT_TIMESTAMP - INTERVAL '1 day'),
  ('j1000000-0000-0000-0000-000000000003', 'Neha', 'Singh', 'neha.singh@email.com', '+1-555-0104', 'interview', CURRENT_TIMESTAMP - INTERVAL '3 days')
ON CONFLICT DO NOTHING;

-- Insert Sample Training Programs
INSERT INTO training_programs (id, title, description, department, duration, status) VALUES
  ('t1000000-0000-0000-0000-000000000001', 'Leadership Development', 'Develop leadership and management skills for managers', 'Human Resources', 40, 'scheduled'),
  ('t1000000-0000-0000-0000-000000000002', 'Advanced TypeScript', 'Master TypeScript for large-scale applications', 'Engineering', 30, 'in-progress'),
  ('t1000000-0000-0000-0000-000000000003', 'Sales Excellence', 'Improve sales techniques and customer relationship management', 'Sales', 25, 'scheduled'),
  ('t1000000-0000-0000-0000-000000000004', 'Digital Marketing Trends', 'Stay updated with latest digital marketing strategies', 'Marketing', 20, 'in-progress')
ON CONFLICT DO NOTHING;

-- Insert Sample Training Enrollments
INSERT INTO training_enrollments (user_id, training_id, status, enrolled_date) VALUES
  ('u1000000-0000-0000-0000-000000000004', 't1000000-0000-0000-0000-000000000001', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '10 days'),
  ('u1000000-0000-0000-0000-000000000006', 't1000000-0000-0000-0000-000000000002', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '5 days'),
  ('u1000000-0000-0000-0000-000000000009', 't1000000-0000-0000-0000-000000000003', 'enrolled', CURRENT_TIMESTAMP - INTERVAL '3 days'),
  ('u1000000-0000-0000-0000-000000000012', 't1000000-0000-0000-0000-000000000004', 'completed', CURRENT_TIMESTAMP - INTERVAL '15 days')
ON CONFLICT DO NOTHING;

-- Insert Sample Performance Goals
INSERT INTO performance_goals (user_id, goals) VALUES
  ('u1000000-0000-0000-0000-000000000005', ARRAY['Complete 2 complex features', 'Improve code coverage to 85%', 'Mentor 2 junior developers']),
  ('u1000000-0000-0000-0000-000000000006', ARRAY['Lead API redesign project', 'Reduce latency by 20%', 'Document architecture patterns']),
  ('u1000000-0000-0000-0000-000000000009', ARRAY['Close $500k in deals', 'Expand customer base by 15%', 'Improve customer satisfaction score'])
ON CONFLICT DO NOTHING;

-- Insert Sample Announcements
INSERT INTO announcements (title, content, author_id, visibility, target_role) VALUES
  ('Company All-Hands Meeting', 'Join us for our quarterly all-hands meeting next Friday at 2 PM. Agenda: Q4 Performance Review and Q1 Planning.', 'u1000000-0000-0000-0000-000000000001', 'all', NULL),
  ('New Remote Work Policy', 'Effective from next month, all employees are eligible for 2 days of remote work per week. Please coordinate with your managers.', 'u1000000-0000-0000-0000-000000000002', 'all', NULL),
  ('Engineering Hackathon', 'Sign up for our internal hackathon happening next month. Great opportunity to innovate and collaborate!', 'u1000000-0000-0000-0000-000000000004', 'specific', 'employee'),
  ('Sales Team Incentives', 'Top performers this quarter will receive bonus packages. Details shared via separate email.', 'u1000000-0000-0000-0000-000000000008', 'specific', 'employee');

-- Insert Sample Payroll Records
INSERT INTO payroll (user_id, month, year, base_salary, allowances, deductions, net_salary, status) VALUES
  ('u1000000-0000-0000-0000-000000000005', 11, 2025, 65000, 5000, 8000, 62000, 'paid'),
  ('u1000000-0000-0000-0000-000000000006', 11, 2025, 62000, 5000, 7500, 59500, 'paid'),
  ('u1000000-0000-0000-0000-000000000009', 11, 2025, 60000, 4000, 7000, 57000, 'pending'),
  ('u1000000-0000-0000-0000-000000000010', 11, 2025, 60000, 4000, 7000, 57000, 'paid');

-- Insert Sample Performance Reviews
INSERT INTO performance_reviews (user_id, reviewer_id, rating, feedback) VALUES
  ('u1000000-0000-0000-0000-000000000005', 'u1000000-0000-0000-0000-000000000004', 4.5, 'Excellent performance. Strong technical skills and great team player. Consider for senior role.'),
  ('u1000000-0000-0000-0000-000000000006', 'u1000000-0000-0000-0000-000000000004', 4.0, 'Solid contributor. Good communication and problem-solving skills. Keep up the good work.'),
  ('u1000000-0000-0000-0000-000000000009', 'u1000000-0000-0000-0000-000000000008', 4.2, 'Exceeds expectations. Strong sales skills and customer engagement. Great addition to the team.');
