const jwt = require('jsonwebtoken');
const { query } = require('../utils/database');

const authenticateToken = async (req, res, next) => {
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
    
    // Check if user still exists
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

    req.user = {
      id: decoded.user_id,
      type: decoded.user_type,
      ...user
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (req.user.type === 'admin' && roles.includes(req.user.role)) {
      return next();
    }

    if (req.user.type === 'student' && roles.includes('student')) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Access denied. Insufficient permissions.'
    });
  };
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {
        id: decoded.user_id,
        type: decoded.user_type
      };
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

module.exports = {
  authenticateToken,
  authorizeRoles,
  optionalAuth
};