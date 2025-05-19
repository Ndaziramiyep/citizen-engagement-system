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

// List updates for a complaint
router.get('/:complaintId', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM updates WHERE complaint_id = ? ORDER BY created_at ASC',
      [req.params.complaintId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
});

// Add an update to a complaint
router.post('/:complaintId', authenticateToken, async (req, res) => {
  const { updateType, previousStatus, newStatus, comment, isPublic } = req.body;
  try {
    await pool.query(
      'INSERT INTO updates (complaint_id, user_id, update_type, previous_status, new_status, comment, is_public) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.params.complaintId, req.user.id, updateType, previousStatus, newStatus, comment, isPublic]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add update' });
  }
});

module.exports = router;
