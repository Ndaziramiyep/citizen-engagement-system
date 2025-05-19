const express = require('express');
const mysql = require('mysql2/promise');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'citizen_engagement_system',
});

// List messages for a complaint
router.get('/:complaintId', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM messages WHERE complaint_id = ? ORDER BY created_at ASC',
      [req.params.complaintId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Send a message for a complaint
router.post('/:complaintId', authenticateToken, async (req, res) => {
  const { message, senderType } = req.body;
  try {
    await pool.query(
      'INSERT INTO messages (complaint_id, sender_id, sender_type, message) VALUES (?, ?, ?, ?)',
      [req.params.complaintId, req.user.id, senderType, message]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
