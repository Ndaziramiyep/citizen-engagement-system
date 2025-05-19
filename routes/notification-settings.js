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

// Get current user's notification settings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM notification_settings WHERE user_id = ?',
      [req.user.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Settings not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update current user's notification settings
router.put('/', authenticateToken, async (req, res) => {
  const {
    statusEmail, messageEmail, resolutionEmail,
    statusApp, messageApp, resolutionApp
  } = req.body;
  try {
    await pool.query(
      `UPDATE notification_settings SET
        status_email = ?, message_email = ?, resolution_email = ?,
        status_app = ?, message_app = ?, resolution_app = ?, updated_at = NOW()
      WHERE user_id = ?`,
      [
        statusEmail, messageEmail, resolutionEmail,
        statusApp, messageApp, resolutionApp,
        req.user.id
      ]
    );
    const [rows] = await pool.query('SELECT * FROM notification_settings WHERE user_id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

module.exports = router;
