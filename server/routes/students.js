const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { query } = require('../utils/database');
const router = express.Router();

// Get student profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const students = await query(
      `SELECT student_id, roll_no, full_name, email, phone, branch, class, division,
              marks_10th, marks_12th, current_cgpa, active_backlog, resume_path,
              profile_image, is_placed, placement_package, registration_date
       FROM students WHERE student_id = ?`,
      [req.user.id]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const student = students[0];

    // Get applications
    const applications = await query(
      `SELECT a.application_id, a.application_date, a.status, a.interview_score,
              j.job_title, j.package_offered, c.company_name
       FROM applications a
       JOIN job_postings j ON a.job_id = j.job_id
       JOIN companies c ON j.company_id = c.company_id
       WHERE a.student_id = ?
       ORDER BY a.application_date DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      student,
      applications,
      placement_status: {
        is_placed: student.is_placed,
        package: student.placement_package,
        applications_count: applications.length,
        pending_applications: applications.filter(app => app.status === 'applied').length
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update student profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const {
      phone, marks_10th, marks_12th, current_cgpa, active_backlog
    } = req.body;

    await query(
      `UPDATE students SET 
       phone = ?, marks_10th = ?, marks_12th = ?, current_cgpa = ?, 
       active_backlog = ?, updated_at = CURRENT_TIMESTAMP
       WHERE student_id = ?`,
      [phone, marks_10th, marks_12th, current_cgpa, active_backlog, req.user.id]
    );

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get student applications
router.get('/applications', authenticateToken, async (req, res) => {
  try {
    const applications = await query(
      `SELECT a.application_id, a.application_date, a.status, a.interview_score, a.feedback,
              j.job_id, j.job_title, j.package_offered, j.location, j.job_type,
              c.company_name, c.company_type
       FROM applications a
       JOIN job_postings j ON a.job_id = j.job_id
       JOIN companies c ON j.company_id = c.company_id
       WHERE a.student_id = ?
       ORDER BY a.application_date DESC`,
      [req.user.id]
    );

    res.json({
      success: true,
      applications
    });

  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;