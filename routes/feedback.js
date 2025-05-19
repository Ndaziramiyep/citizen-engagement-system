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

// List feedback for a complaint
router.get('/:complaintId', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM feedback WHERE complaint_id = ?',
      [req.params.complaintId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

// Add feedback to a complaint
router.post('/:complaintId', authenticateToken, async (req, res) => {
  const { rating, comment } = req.body;
  try {
    await pool.query(
      'INSERT INTO feedback (complaint_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [req.params.complaintId, req.user.id, rating, comment]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add feedback' });
  }
});

module.exports = router;
