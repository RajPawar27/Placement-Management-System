const express = require('express');
const router = express.Router();

// Placeholder for notifications routes
router.get('/', (req, res) => {
  res.json({
    success: true,
    notifications: [],
    unread_count: 0
  });
});

router.put('/:notification_id/read', (req, res) => {
  res.json({
    success: true,
    message: 'Notification marked as read'
  });
});

module.exports = router;