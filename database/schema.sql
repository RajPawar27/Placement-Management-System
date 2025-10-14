-- PICT Placement Management System Database Schema
-- Created: October 14, 2025

-- Create database
CREATE DATABASE IF NOT EXISTS pict_placement_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pict_placement_db;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    roll_no VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    branch ENUM('Computer Engineering', 'IT Engineering', 'ENTC Engineering', 'AIDS', 'Electronics and Computer Engineering') NOT NULL,
    class ENUM('FE', 'SE', 'TE', 'BE') NOT NULL,
    division VARCHAR(2),
    marks_10th DECIMAL(5,2),
    marks_12th DECIMAL(5,2),
    current_cgpa DECIMAL(3,2),
    active_backlog BOOLEAN DEFAULT FALSE,
    resume_path VARCHAR(500),
    profile_image VARCHAR(500),
    is_placed BOOLEAN DEFAULT FALSE,
    placement_package DECIMAL(10,2) NULL,
    placed_company_id INT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
    INDEX idx_email (email),
    INDEX idx_roll_no (roll_no),
    INDEX idx_branch (branch),
    INDEX idx_class (class),
    INDEX idx_placement_status (is_placed)
);

-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
    company_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(200) NOT NULL,
    company_type ENUM('Product', 'Service', 'Startup', 'MNC', 'Government'),
    industry VARCHAR(100),
    website VARCHAR(255),
    contact_person VARCHAR(100),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(15),
    address TEXT,
    company_description TEXT,
    logo_path VARCHAR(500),
    status ENUM('active', 'inactive', 'blacklisted') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_company_name (company_name),
    INDEX idx_company_type (company_type),
    INDEX idx_status (status)
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'tpo', 'coordinator') DEFAULT 'coordinator',
    department VARCHAR(100),
    phone VARCHAR(15),
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Create job_postings table
CREATE TABLE IF NOT EXISTS job_postings (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    company_id INT NOT NULL,
    job_title VARCHAR(200) NOT NULL,
    job_description TEXT,
    job_type ENUM('Full-time', 'Internship', 'Part-time') DEFAULT 'Full-time',
    package_offered DECIMAL(10,2),
    location VARCHAR(200),
    required_skills TEXT,
    eligible_branches JSON,
    min_cgpa DECIMAL(3,2),
    max_backlogs INT DEFAULT 0,
    min_10th_marks DECIMAL(5,2),
    min_12th_marks DECIMAL(5,2),
    application_deadline DATE,
    interview_date DATE NULL,
    selection_process TEXT,
    bond_details TEXT NULL,
    other_requirements TEXT,
    total_positions INT,
    status ENUM('draft', 'open', 'closed', 'cancelled') DEFAULT 'draft',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES admin_users(admin_id),
    INDEX idx_company_id (company_id),
    INDEX idx_job_title (job_title),
    INDEX idx_status (status),
    INDEX idx_application_deadline (application_deadline)
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('applied', 'shortlisted', 'rejected', 'selected', 'waitlisted') DEFAULT 'applied',
    interview_score DECIMAL(5,2) NULL,
    feedback TEXT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES job_postings(job_id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (student_id, job_id),
    INDEX idx_student_id (student_id),
    INDEX idx_job_id (job_id),
    INDEX idx_status (status),
    INDEX idx_application_date (application_date)
);

-- Create placement_drives table
CREATE TABLE IF NOT EXISTS placement_drives (
    drive_id INT AUTO_INCREMENT PRIMARY KEY,
    drive_name VARCHAR(200) NOT NULL,
    company_id INT NOT NULL,
    drive_date DATE,
    venue VARCHAR(200),
    coordinator VARCHAR(100),
    max_participants INT,
    registered_count INT DEFAULT 0,
    status ENUM('scheduled', 'ongoing', 'completed', 'cancelled') DEFAULT 'scheduled',
    description TEXT,
    requirements TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE,
    INDEX idx_company_id (company_id),
    INDEX idx_drive_date (drive_date),
    INDEX idx_status (status)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_type ENUM('student', 'admin', 'all') NOT NULL,
    recipient_id INT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_recipient (recipient_type, recipient_id),
    INDEX idx_created_at (created_at),
    INDEX idx_is_read (is_read)
);

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES admin_users(admin_id),
    INDEX idx_setting_key (setting_key)
);

-- Add foreign key constraint for placed_company_id in students table
ALTER TABLE students ADD CONSTRAINT fk_students_placed_company 
    FOREIGN KEY (placed_company_id) REFERENCES companies(company_id);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, full_name, email, password_hash, role, department) VALUES 
('admin', 'System Administrator', 'admin@pict.edu', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewWKEhFsXGVrJUb.', 'super_admin', 'IT Department');

-- Insert some default system settings
INSERT INTO system_settings (setting_key, setting_value, description, updated_by) VALUES 
('placement_season_start', '2025-08-01', 'Start date of placement season', 1),
('placement_season_end', '2026-05-31', 'End date of placement season', 1),
('max_applications_per_student', '10', 'Maximum applications a student can submit', 1),
('min_cgpa_requirement', '6.0', 'Minimum CGPA required for placements', 1);

-- Create indexes for better performance
CREATE INDEX idx_students_cgpa ON students(current_cgpa);
CREATE INDEX idx_students_branch_class ON students(branch, class);
CREATE INDEX idx_jobs_package ON job_postings(package_offered);
CREATE INDEX idx_applications_student_status ON applications(student_id, status);

COMMIT;
