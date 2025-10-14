const express = require('express');
const { query } = require('../utils/database');
const router = express.Router();

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await query(
      `SELECT company_id, company_name, company_type, industry, website, 
              logo_path, status
       FROM companies
       WHERE status = 'active'
       ORDER BY company_name ASC`
    );

    res.json({
      success: true,
      companies
    });

  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get company details
router.get('/:company_id', async (req, res) => {
  try {
    const { company_id } = req.params;

    const companies = await query(
      'SELECT * FROM companies WHERE company_id = ? AND status = "active"',
      [company_id]
    );

    if (companies.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Company not found'
      });
    }

    const jobs = await query(
      `SELECT job_id, job_title, job_type, package_offered, location, 
              application_deadline, status
       FROM job_postings
       WHERE company_id = ? AND status = 'open'
       ORDER BY created_at DESC`,
      [company_id]
    );

    res.json({
      success: true,
      company: companies[0],
      jobs
    });

  } catch (error) {
    console.error('Get company details error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;