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

// Submit a new complaint
router.post('/', authenticateToken, async (req, res) => {
  const {
    submissionType, category, subject, description, location, priority, departmentId, dueDate, isAnonymous
  } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO complaints
      (user_id, submission_type, category, subject, description, location, priority, department_id, due_date, is_anonymous)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        submissionType,
        category,
        subject,
        description,
        location,
        priority,
        departmentId,
        dueDate,
        isAnonymous
      ]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit complaint' });
  }
});

// Get a complaint by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM complaints WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Complaint not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaint' });
  }
});

// List complaints for the current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM complaints WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

module.exports = router;
