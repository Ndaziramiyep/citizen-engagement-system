const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'citizen_engagement_system',
});

// Configure multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// List attachments for a complaint
router.get('/:complaintId', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM attachments WHERE complaint_id = ?',
      [req.params.complaintId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch attachments' });
  }
});

// Upload an attachment for a complaint
router.post('/:complaintId', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  try {
    await pool.query(
      'INSERT INTO attachments (complaint_id, file_name, file_path, file_type, file_size) VALUES (?, ?, ?, ?, ?)',
      [
        req.params.complaintId,
        req.file.originalname,
        req.file.filename,
        req.file.mimetype,
        req.file.size
      ]
    );
    res.json({ success: true, file: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

module.exports = router;
