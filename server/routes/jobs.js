const express = require('express');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { query } = require('../utils/database');
const router = express.Router();

// Get all jobs with filters
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { branch, job_type, min_package, status = 'open', page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let whereConditions = ['j.status = ?'];
    let queryParams = [status];

    if (branch) {
      whereConditions.push('JSON_CONTAINS(j.eligible_branches, ?)');
      queryParams.push(`"${branch}"`);
    }

    if (job_type) {
      whereConditions.push('j.job_type = ?');
      queryParams.push(job_type);
    }

    if (min_package) {
      whereConditions.push('j.package_offered >= ?');
      queryParams.push(min_package);
    }

    const whereClause = whereConditions.join(' AND ');

    const jobs = await query(
      `SELECT j.job_id, j.job_title, j.job_description, j.job_type, j.package_offered,
              j.location, j.application_deadline, j.total_positions, j.min_cgpa,
              j.max_backlogs, j.min_10th_marks, j.min_12th_marks,
              c.company_name, c.company_type, c.logo_path,
              (SELECT COUNT(*) FROM applications WHERE job_id = j.job_id) as applications_count
       FROM job_postings j
       JOIN companies c ON j.company_id = c.company_id
       WHERE ${whereClause}
       ORDER BY j.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, parseInt(limit), parseInt(offset)]
    );

    // Get total count
    const totalResult = await query(
      `SELECT COUNT(*) as total FROM job_postings j WHERE ${whereClause}`,
      queryParams
    );

    res.json({
      success: true,
      jobs,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(totalResult[0].total / limit),
        total_jobs: totalResult[0].total,
        has_next: (page * limit) < totalResult[0].total,
        has_prev: page > 1
      }
    });

  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get specific job details
router.get('/:job_id', optionalAuth, async (req, res) => {
  try {
    const { job_id } = req.params;

    const jobs = await query(
      `SELECT j.*, c.company_name, c.company_type, c.company_description, 
              c.website, c.logo_path, c.industry
       FROM job_postings j
       JOIN companies c ON j.company_id = c.company_id
       WHERE j.job_id = ? AND j.status = 'open'`,
      [job_id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    const job = jobs[0];
    let isEligible = true;
    let hasApplied = false;

    if (req.user && req.user.type === 'student') {
      // Check if student has already applied
      const applications = await query(
        'SELECT application_id FROM applications WHERE student_id = ? AND job_id = ?',
        [req.user.id, job_id]
      );
      hasApplied = applications.length > 0;

      // Check eligibility
      const student = await query(
        'SELECT branch, current_cgpa, active_backlog, marks_10th, marks_12th FROM students WHERE student_id = ?',
        [req.user.id]
      );

      if (student.length > 0) {
        const studentData = student[0];
        
        // Check branch eligibility
        if (job.eligible_branches) {
          const eligibleBranches = JSON.parse(job.eligible_branches);
          if (!eligibleBranches.includes(studentData.branch)) {
            isEligible = false;
          }
        }

        // Check CGPA
        if (job.min_cgpa && studentData.current_cgpa < job.min_cgpa) {
          isEligible = false;
        }

        // Check backlogs
        if (job.max_backlogs !== null && studentData.active_backlog && job.max_backlogs === 0) {
          isEligible = false;
        }

        // Check 10th marks
        if (job.min_10th_marks && studentData.marks_10th < job.min_10th_marks) {
          isEligible = false;
        }

        // Check 12th marks
        if (job.min_12th_marks && studentData.marks_12th < job.min_12th_marks) {
          isEligible = false;
        }
      }
    }

    res.json({
      success: true,
      job,
      company: {
        company_name: job.company_name,
        company_type: job.company_type,
        company_description: job.company_description,
        website: job.website,
        logo_path: job.logo_path,
        industry: job.industry
      },
      is_eligible: isEligible,
      has_applied: hasApplied
    });

  } catch (error) {
    console.error('Get job details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Apply for a job
router.post('/:job_id/apply', authenticateToken, async (req, res) => {
  try {
    const { job_id } = req.params;

    // Check if job exists and is open
    const jobs = await query(
      'SELECT job_id, application_deadline FROM job_postings WHERE job_id = ? AND status = "open"',
      [job_id]
    );

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Job not found or not accepting applications'
      });
    }

    const job = jobs[0];

    // Check deadline
    if (job.application_deadline && new Date() > new Date(job.application_deadline)) {
      return res.status(400).json({
        success: false,
        message: 'Application deadline has passed'
      });
    }

    // Check if already applied
    const existingApplications = await query(
      'SELECT application_id FROM applications WHERE student_id = ? AND job_id = ?',
      [req.user.id, job_id]
    );

    if (existingApplications.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const result = await query(
      'INSERT INTO applications (student_id, job_id) VALUES (?, ?)',
      [req.user.id, job_id]
    );

    res.json({
      success: true,
      application_id: result.insertId,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    console.error('Apply job error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;