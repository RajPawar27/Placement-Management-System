-- PICT Placement Management System - Sample Data Insert Script
-- Run this after creating the database schema

USE pict_placement_db;

-- Insert Companies
INSERT INTO companies (company_name, company_type, industry, website, contact_person, contact_email, contact_phone, address, company_description, status) VALUES
('Tata Consultancy Services', 'MNC', 'IT Services', 'www.tcs.com', 'Rajesh Kumar', 'recruitment@tcs.com', '9876543210', 'Mumbai, Maharashtra', 'Leading IT services and consulting company', 'active'),
('Infosys', 'MNC', 'IT Services', 'www.infosys.com', 'Priya Sharma', 'careers@infosys.com', '9876543211', 'Pune, Maharashtra', 'Global leader in next-generation digital services', 'active'),
('Google India', 'Product', 'Technology', 'www.google.com', 'Amit Patel', 'hiring@google.com', '9876543212', 'Bangalore, Karnataka', 'Multinational technology company', 'active'),
('Microsoft', 'Product', 'Software', 'www.microsoft.com', 'Sneha Desai', 'recruit@microsoft.com', '9876543213', 'Hyderabad, Telangana', 'Leading software and cloud services provider', 'active'),
('Amazon', 'Product', 'E-commerce', 'www.amazon.com', 'Rahul Mehta', 'jobs@amazon.in', '9876543214', 'Bangalore, Karnataka', 'Global e-commerce and cloud computing leader', 'active'),
('Wipro', 'MNC', 'IT Services', 'www.wipro.com', 'Neha Singh', 'placement@wipro.com', '9876543215', 'Pune, Maharashtra', 'IT services corporation', 'active'),
('Accenture', 'MNC', 'Consulting', 'www.accenture.com', 'Vikram Rao', 'recruiting@accenture.com', '9876543216', 'Mumbai, Maharashtra', 'Professional services company', 'active'),
('Cognizant', 'MNC', 'IT Services', 'www.cognizant.com', 'Aisha Khan', 'talent@cognizant.com', '9876543217', 'Pune, Maharashtra', 'IT services provider', 'active'),
('Persistent Systems', 'Product', 'Software', 'www.persistent.com', 'Sanjay Joshi', 'hr@persistent.com', '9876543218', 'Pune, Maharashtra', 'Software product development company', 'active'),
('ZS Associates', 'Service', 'Consulting', 'www.zs.com', 'Meera Reddy', 'campus@zs.com', '9876543219', 'Pune, Maharashtra', 'Management consulting firm', 'active');

-- Insert Additional Admin Users
INSERT INTO admin_users (username, full_name, email, password_hash, role, department, phone) VALUES
('tpo_head', 'Dr. Suresh Patil', 'tpo@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', 'tpo', 'Training & Placement', '9988776655'),
('coord_comp', 'Prof. Anjali Kulkarni', 'anjali.k@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', 'coordinator', 'Computer Engineering', '9988776656'),
('coord_it', 'Prof. Deepak Bhosale', 'deepak.b@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', 'coordinator', 'IT Engineering', '9988776657');

-- Insert Students
INSERT INTO students (roll_no, full_name, email, password_hash, phone, branch, class, division, marks_10th, marks_12th, current_cgpa, active_backlog, is_placed, status) VALUES
('21CO001', 'Aarav Sharma', 'aarav.sharma@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456701', 'Computer Engineering', 'BE', 'A', 92.50, 88.40, 9.20, FALSE, FALSE, 'active'),
('21CO002', 'Diya Patel', 'diya.patel@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456702', 'Computer Engineering', 'BE', 'A', 95.00, 91.20, 9.50, FALSE, TRUE, 'active'),
('21CO003', 'Rohan Gupta', 'rohan.gupta@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456703', 'Computer Engineering', 'BE', 'A', 89.00, 85.60, 8.80, FALSE, FALSE, 'active'),
('21IT001', 'Ananya Singh', 'ananya.singh@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456704', 'IT Engineering', 'BE', 'B', 93.50, 89.70, 9.10, FALSE, TRUE, 'active'),
('21IT002', 'Kabir Mehta', 'kabir.mehta@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456705', 'IT Engineering', 'BE', 'B', 87.00, 83.50, 8.50, TRUE, FALSE, 'active'),
('21EN001', 'Ishita Reddy', 'ishita.reddy@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456706', 'ENTC Engineering', 'BE', 'C', 91.00, 87.30, 8.90, FALSE, FALSE, 'active'),
('21AI001', 'Arjun Rao', 'arjun.rao@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456707', 'AIDS', 'BE', 'A', 94.00, 90.50, 9.30, FALSE, FALSE, 'active'),
('21CO004', 'Sara Khan', 'sara.khan@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456708', 'Computer Engineering', 'BE', 'B', 90.00, 86.80, 8.70, FALSE, TRUE, 'active'),
('21EC001', 'Vivaan Desai', 'vivaan.desai@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456709', 'Electronics and Computer Engineering', 'BE', 'A', 88.50, 84.20, 8.60, FALSE, FALSE, 'active'),
('21IT003', 'Aanya Joshi', 'aanya.joshi@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456710', 'IT Engineering', 'BE', 'A', 96.00, 92.50, 9.60, FALSE, FALSE, 'active'),
('22CO001', 'Aditya Kumar', 'aditya.kumar@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456711', 'Computer Engineering', 'TE', 'A', 90.00, 87.00, 8.90, FALSE, FALSE, 'active'),
('22IT001', 'Priya Nair', 'priya.nair@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456712', 'IT Engineering', 'TE', 'B', 92.00, 88.50, 9.00, FALSE, FALSE, 'active'),
('22AI001', 'Rishi Verma', 'rishi.verma@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456713', 'AIDS', 'TE', 'A', 91.50, 89.00, 9.10, FALSE, FALSE, 'active'),
('22EN001', 'Meera Iyer', 'meera.iyer@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456714', 'ENTC Engineering', 'TE', 'C', 89.00, 85.00, 8.70, FALSE, FALSE, 'active'),
('22EC001', 'Karan Pillai', 'karan.pillai@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', '9123456715', 'Electronics and Computer Engineering', 'TE', 'A', 88.00, 84.50, 8.50, TRUE, FALSE, 'active');

-- Update placed students with company and package
UPDATE students SET placed_company_id = 3, placement_package = 2800000.00 WHERE roll_no = '21CO002';
UPDATE students SET placed_company_id = 5, placement_package = 2500000.00 WHERE roll_no = '21IT001';
UPDATE students SET placed_company_id = 1, placement_package = 800000.00 WHERE roll_no = '21CO004';

-- Insert Job Postings
INSERT INTO job_postings (company_id, job_title, job_description, job_type, package_offered, location, required_skills, eligible_branches, min_cgpa, max_backlogs, min_10th_marks, min_12th_marks, application_deadline, selection_process, total_positions, status, created_by) VALUES
(1, 'Software Engineer', 'Develop and maintain enterprise applications', 'Full-time', 800000.00, 'Pune', 'Java, Spring Boot, SQL, Microservices', '["Computer Engineering", "IT Engineering", "AIDS"]', 7.00, 0, 70.00, 70.00, '2025-11-30', 'Online Test, Technical Interview, HR Interview', 50, 'open', 2),
(2, 'System Engineer', 'Work on various technology projects', 'Full-time', 750000.00, 'Bangalore', 'Java, Python, Web Development', '["Computer Engineering", "IT Engineering", "ENTC Engineering"]', 6.50, 1, 65.00, 65.00, '2025-12-15', 'Aptitude Test, Technical Interview, HR Round', 60, 'open', 2),
(3, 'Software Development Engineer', 'Build innovative software solutions', 'Full-time', 2800000.00, 'Bangalore', 'DSA, Java/C++, System Design', '["Computer Engineering", "IT Engineering", "AIDS"]', 8.50, 0, 85.00, 85.00, '2025-10-31', 'Online Assessment, Technical Interviews (3 rounds), Hiring Committee', 10, 'open', 2),
(4, 'Software Engineer II', 'Develop cloud-based solutions', 'Full-time', 2400000.00, 'Hyderabad', 'C#, .NET, Azure, Algorithms', '["Computer Engineering", "IT Engineering"]', 8.00, 0, 80.00, 80.00, '2025-11-15', 'Coding Test, Technical Interviews, Bar Raiser', 15, 'open', 2),
(5, 'SDE Intern', 'Summer internship program', 'Internship', 80000.00, 'Bangalore', 'Programming, Problem Solving', '["Computer Engineering", "IT Engineering", "AIDS", "Electronics and Computer Engineering"]', 7.50, 0, 75.00, 75.00, '2025-12-30', 'Online Assessment, Technical Interview', 20, 'open', 2),
(6, 'Project Engineer', 'Work on client projects', 'Full-time', 650000.00, 'Pune', 'Java, Python, Web Technologies', '["Computer Engineering", "IT Engineering", "ENTC Engineering"]', 6.00, 2, 60.00, 60.00, '2026-01-15', 'Written Test, Group Discussion, Interview', 45, 'open', 2),
(7, 'Technology Analyst', 'Business and technology consulting', 'Full-time', 1200000.00, 'Mumbai', 'Problem Solving, Communication, Programming', '["Computer Engineering", "IT Engineering", "AIDS"]', 7.50, 0, 75.00, 75.00, '2025-11-20', 'Case Study, Technical Round, Consulting Interview', 25, 'open', 2),
(8, 'Programmer Analyst', 'Software development and maintenance', 'Full-time', 700000.00, 'Pune', 'Java, SQL, Web Technologies', '["Computer Engineering", "IT Engineering"]', 6.50, 1, 65.00, 65.00, '2025-12-10', 'Aptitude Test, Technical Interview, HR Interview', 40, 'open', 2),
(9, 'Associate Software Engineer', 'Product development role', 'Full-time', 900000.00, 'Pune', 'Java, C++, System Design, DBMS', '["Computer Engineering", "IT Engineering", "AIDS"]', 7.00, 0, 70.00, 70.00, '2025-11-25', 'Technical Test, Design Round, HR Round', 30, 'open', 2),
(10, 'Business Technology Analyst', 'Data analytics and consulting', 'Full-time', 1400000.00, 'Pune', 'Analytics, SQL, Python, Communication', '["Computer Engineering", "IT Engineering", "AIDS"]', 8.00, 0, 80.00, 80.00, '2025-10-25', 'Case Study, Data Analysis Round, Interview', 12, 'open', 2);

-- Insert Applications
INSERT INTO applications (student_id, job_id, status, interview_score) VALUES
(1, 1, 'shortlisted', 85.00),
(1, 3, 'applied', NULL),
(2, 3, 'selected', 95.00),
(3, 1, 'applied', NULL),
(3, 2, 'shortlisted', 78.00),
(4, 2, 'selected', 88.00),
(4, 5, 'selected', 90.00),
(5, 1, 'rejected', 65.00),
(6, 2, 'shortlisted', 80.00),
(7, 3, 'applied', NULL),
(7, 4, 'shortlisted', 87.00),
(8, 1, 'selected', 82.00),
(9, 6, 'applied', NULL),
(10, 3, 'applied', NULL),
(10, 7, 'shortlisted', 92.00);

-- Insert Placement Drives
INSERT INTO placement_drives (drive_name, company_id, drive_date, venue, coordinator, max_participants, registered_count, status, description) VALUES
('TCS Pool Campus Drive 2025', 1, '2025-11-05', 'PICT Auditorium', 'Prof. Anjali Kulkarni', 100, 85, 'scheduled', 'On-campus placement drive for TCS'),
('Infosys Hiring Drive', 2, '2025-11-18', 'PICT Conference Hall', 'Prof. Deepak Bhosale', 80, 72, 'scheduled', 'Campus recruitment for System Engineer role'),
('Google University Grad 2026', 3, '2025-10-28', 'Online', 'Dr. Suresh Patil', 50, 45, 'scheduled', 'Virtual hiring process for SDE roles'),
('Microsoft IDC Recruitment', 4, '2025-11-12', 'Microsoft Office Hyderabad', 'Prof. Anjali Kulkarni', 40, 38, 'scheduled', 'Off-campus drive at Microsoft IDC'),
('Amazon Summer Internship', 5, '2025-12-20', 'Online', 'Prof. Deepak Bhosale', 60, 0, 'scheduled', 'Summer internship recruitment drive');

-- Insert Notifications
INSERT INTO notifications (recipient_type, recipient_id, title, message, type, is_read) VALUES
('all', NULL, 'New Job Opening: Google SDE', 'Google has posted a new Software Development Engineer position. Application deadline: Oct 31, 2025', 'info', FALSE),
('student', 1, 'Application Shortlisted', 'Congratulations! You have been shortlisted for TCS Software Engineer position. Interview scheduled for Nov 10, 2025', 'success', FALSE),
('student', 2, 'Placement Confirmation', 'You have been successfully placed at Google with package 28 LPA. Please complete the joining formalities.', 'success', TRUE),
('all', NULL, 'Placement Drive: TCS', 'TCS placement drive scheduled on Nov 5, 2025 at PICT Auditorium. Register now!', 'info', FALSE),
('student', 5, 'Application Status Update', 'Your application for TCS has been rejected. Keep applying for other opportunities.', 'error', TRUE),
('all', NULL, 'Resume Building Workshop', 'Mandatory resume building workshop on Oct 20, 2025 at 2 PM in Seminar Hall', 'warning', FALSE);

-- Insert Additional System Settings
INSERT INTO system_settings (setting_key, setting_value, description, updated_by) VALUES 
('allow_multiple_offers', 'false', 'Whether students can accept multiple offers', 1),
('notification_email_enabled', 'true', 'Enable email notifications', 1),
('resume_max_size_mb', '2', 'Maximum resume file size in MB', 1),
('profile_completion_mandatory', 'true', 'Profile completion required before applying', 1);

COMMIT;

-- Verification Queries (Optional - Run to verify data)
-- SELECT COUNT(*) as total_students FROM students;
-- SELECT COUNT(*) as total_companies FROM companies;
-- SELECT COUNT(*) as total_jobs FROM job_postings WHERE status = 'open';
-- SELECT COUNT(*) as total_applications FROM applications;
-- SELECT full_name, company_name, placement_package FROM students s JOIN companies c ON s.placed_company_id = c.company_id WHERE s.is_placed = TRUE;