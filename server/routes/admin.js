const express = require('express');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const { query } = require('../utils/database');
const router = express.Router();

// Protect all admin routes
router.use(authenticateToken);
router.use(authorizeRoles('super_admin', 'tpo', 'coordinator'));

// Get admin dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    // Get statistics
    const stats = await Promise.all([
      query('SELECT COUNT(*) as count FROM students WHERE status = "active"'),
      query('SELECT COUNT(*) as count FROM companies WHERE status = "active"'),
      query('SELECT COUNT(*) as count FROM job_postings WHERE status = "open"'),
      query('SELECT COUNT(*) as count FROM students WHERE is_placed = TRUE'),
      query('SELECT COUNT(*) as count FROM applications WHERE status = "applied"')
    ]);

    const totalStudents = stats[0][0].count;
    const placedStudents = stats[3][0].count;
    const placementPercentage = totalStudents > 0 ? (placedStudents / totalStudents * 100).toFixed(2) : 0;

    // Get recent applications
    const recentApplications = await query(
      `SELECT a.application_id, a.application_date, a.status,
              s.full_name as student_name, s.roll_no,
              j.job_title, c.company_name
       FROM applications a
       JOIN students s ON a.student_id = s.student_id
       JOIN job_postings j ON a.job_id = j.job_id
       JOIN companies c ON j.company_id = c.company_id
       ORDER BY a.application_date DESC
       LIMIT 10`
    );

    res.json({
      success: true,
      stats: {
        total_students: totalStudents,
        total_companies: stats[1][0].count,
        active_jobs: stats[2][0].count,
        placed_students: placedStudents,
        placement_percentage: parseFloat(placementPercentage),
        pending_applications: stats[4][0].count,
        recent_applications: recentApplications
      }
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get all students with filters
router.get('/students', async (req, res) => {
  try {
    const { branch, class: studentClass, placement_status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let whereConditions = ['s.status = "active"'];
    let queryParams = [];

    if (branch) {
      whereConditions.push('s.branch = ?');
      queryParams.push(branch);
    }

    if (studentClass) {
      whereConditions.push('s.class = ?');
      queryParams.push(studentClass);
    }

    if (placement_status === 'placed') {
      whereConditions.push('s.is_placed = TRUE');
    } else if (placement_status === 'unplaced') {
      whereConditions.push('s.is_placed = FALSE');
    }

    const whereClause = whereConditions.join(' AND ');
    queryParams.push(parseInt(limit), parseInt(offset));

    const students = await query(
      `SELECT s.student_id, s.roll_no, s.full_name, s.email, s.phone,
              s.branch, s.class, s.current_cgpa, s.is_placed, s.placement_package,
              c.company_name as placed_company,
              (SELECT COUNT(*) FROM applications WHERE student_id = s.student_id) as applications_count
       FROM students s
       LEFT JOIN companies c ON s.placed_company_id = c.company_id
       WHERE ${whereClause}
       ORDER BY s.full_name ASC
       LIMIT ? OFFSET ?`,
      queryParams
    );

    // Get total count
    const totalResult = await query(
      `SELECT COUNT(*) as total FROM students s WHERE ${whereClause}`,
      queryParams.slice(0, -2)
    );

    res.json({
      success: true,
      students,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(totalResult[0].total / limit),
        total_students: totalResult[0].total
      }
    });

  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update application status
router.put('/applications/:application_id/status', async (req, res) => {
  try {
    const { application_id } = req.params;
    const { status, feedback, interview_score } = req.body;

    // Validate status
    const validStatuses = ['applied', 'shortlisted', 'rejected', 'selected', 'waitlisted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    await query(
      `UPDATE applications 
       SET status = ?, feedback = ?, interview_score = ?, updated_at = CURRENT_TIMESTAMP
       WHERE application_id = ?`,
      [status, feedback || null, interview_score || null, application_id]
    );

    res.json({
      success: true,
      message: 'Application status updated successfully'
    });

  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;