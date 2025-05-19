const express = require('express');
const initDB = require('./db/db-init'); // Adjust path if needed
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const complaintRoutes = require('./routes/complaints');
const departmentRoutes = require('./routes/departments');
const notificationRoutes = require('./routes/notifications');
const messageRoutes = require('./routes/messages');
const attachmentRoutes = require('./routes/attachments');
const updateRoutes = require('./routes/updates');
const feedbackRoutes = require('./routes/feedback');
const auditLogRoutes = require('./routes/audit-logs');
const notificationSettingsRoutes = require('./routes/notification-settings');

const app = express();
const PORT = 5000;

// Middleware for JSON parsing
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/complaints', complaintRoutes);
app.use('/api/v1/departments', departmentRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/attachments', attachmentRoutes);
app.use('/api/v1/updates', updateRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/audit-logs', auditLogRoutes);
app.use('/api/v1/notification-settings', notificationSettingsRoutes);

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3001', // Change to your Next.js port if not 3001
  credentials: true
}));

// Health check route
app.get('/', (req, res) => {
  res.send('Citizen Engagement System API is running!');
});

// Initialize DB tables before starting the server
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

