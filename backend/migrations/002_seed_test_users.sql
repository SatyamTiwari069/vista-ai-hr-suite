-- Seed test users for development
-- These are the quick login credentials shown on the login page

INSERT INTO users (email, name, password_hash, role, department, position, is_active) 
VALUES 
-- Admin user (password: admin123)
('admin@vista.com', 'Admin User', '$2a$10$YourHashedPasswordHere', 'admin', 'IT', 'System Administrator', true),

-- HR user (password: hr123)
('hr@vista.com', 'HR Manager', '$2a$10$YourHashedPasswordHere', 'hr', 'Human Resources', 'HR Manager', true),

-- Manager user (password: manager123)
('manager@vista.com', 'Team Manager', '$2a$10$YourHashedPasswordHere', 'manager', 'Engineering', 'Senior Manager', true),

-- Employee user (password: employee123)
('employee@vista.com', 'John Doe', '$2a$10$YourHashedPasswordHere', 'employee', 'Engineering', 'Software Engineer', true)
ON CONFLICT (email) DO NOTHING;
