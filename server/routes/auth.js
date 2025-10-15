const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../utils/database');
const router = express.Router();

// Generate JWT token
const generateToken = (userId, userType) => {
  return jwt.sign(
    { user_id: userId, user_type: userType },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Student Registration
router.post('/register', [
  body('roll_no').notEmpty().withMessage('Roll number is required'),
  body('full_name').isLength({ min: 2 }).withMessage('Full name must be at least 2 characters'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('branch').notEmpty().withMessage('Branch is required'),
  body('class').isIn(['FE', 'SE', 'TE', 'BE']).withMessage('Valid class is required'),
  body('current_cgpa').isFloat({ min: 0, max: 10 }).withMessage('CGPA must be between 0 and 10')
], async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      roll_no, full_name, email, password, phone, branch, class: studentClass,
      division, marks_10th, marks_12th, current_cgpa, active_backlog
    } = req.body;

    // Check if student already exists
    const existingStudent = await query(
      'SELECT student_id FROM students WHERE email = ? OR roll_no = ?',
      [email, roll_no]
    );

    if (existingStudent.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email or roll number already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new student
    const result = await query(
      `INSERT INTO students (
        roll_no, full_name, email, password_hash, phone, branch, class, 
        division, marks_10th, marks_12th, current_cgpa, active_backlog
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        roll_no, full_name, email, hashedPassword, phone, branch, studentClass,
        division, marks_10th, marks_12th, current_cgpa, active_backlog || false
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      student_id: result.insertId
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Login (Student/Admin)
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  body('user_type').isIn(['student', 'admin']).withMessage('Valid user type is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, user_type } = req.body;
    let user, tableName, idField;

    if (user_type === 'student') {
      tableName = 'students';
      idField = 'student_id';
      const users = await query(
        'SELECT student_id, full_name, email, password_hash, status FROM students WHERE email = ?',
        [email]
      );
      user = users[0];
    } else {
      tableName = 'admin_users';
      idField = 'admin_id';
      const users = await query(
        'SELECT admin_id, full_name, email, password_hash, role, is_active FROM admin_users WHERE email = ?',
        [email]
      );
      user = users[0];
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (user_type === 'student' && user.status !== 'active') {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    if (user_type === 'admin' && !user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is inactive'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login for admin
    if (user_type === 'admin') {
      await query(
        'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE admin_id = ?',
        [user[idField]]
      );
    }

    // Generate token
    const token = generateToken(user[idField], user_type);

    // Remove password from response
    delete user.password_hash;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user[idField],
        type: user_type,
        ...user
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Forgot Password
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Check if user exists
    const student = await query('SELECT student_id FROM students WHERE email = ?', [email]);
    const admin = await query('SELECT admin_id FROM admin_users WHERE email = ?', [email]);

    if (student.length === 0 && admin.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email address'
      });
    }

    // In a real application, you would send an email with reset link
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: 'Password reset instructions sent to your email'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Reset Password
router.post('/reset-password', [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('new_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // In a real application, you would verify the reset token
    // and update the password accordingly
    res.json({
      success: true,
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Token verification endpoint
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user still exists and is active
    let user;
    if (decoded.user_type === 'student') {
      const students = await query(
        'SELECT student_id, roll_no, full_name, email, status FROM students WHERE student_id = ? AND status = "active"',
        [decoded.user_id]
      );
      user = students[0];
    } else if (decoded.user_type === 'admin') {
      const admins = await query(
        'SELECT admin_id, username, full_name, email, role, is_active FROM admin_users WHERE admin_id = ? AND is_active = TRUE',
        [decoded.user_id]
      );
      user = admins[0];
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid',
      user: {
        id: decoded.user_id,
        type: decoded.user_type,
        ...user
      }
    });

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;