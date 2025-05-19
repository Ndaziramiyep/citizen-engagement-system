const express = require('express');
const mysql = require('mysql2/promise');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'citizen_engagement_system',
});

// List audit logs for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM audit_logs WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// Add an audit log entry (call this from your app logic as needed)
router.post('/', authenticateToken, async (req, res) => {
  const { action, entityType, entityId, details, ipAddress, userAgent } = req.body;
  try {
    await pool.query(
      'INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, action, entityType, entityId, details, ipAddress, userAgent]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add audit log' });
  }
});

module.exports = router;
