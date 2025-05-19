const express = require('express');
const next = require('next');
const cors = require('cors');
const initDB = require('./db/db-init');
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

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Enable CORS if needed
  server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

  // Middleware for JSON parsing
  server.use(express.json());

  // API routes
  server.use('/api/v1/auth', authRoutes);
  server.use('/api/v1/users', userRoutes);
  server.use('/api/v1/complaints', complaintRoutes);
  server.use('/api/v1/departments', departmentRoutes);
  server.use('/api/v1/notifications', notificationRoutes);
  server.use('/api/v1/messages', messageRoutes);
  server.use('/api/v1/attachments', attachmentRoutes);
  server.use('/api/v1/updates', updateRoutes);
  server.use('/api/v1/feedback', feedbackRoutes);
  server.use('/api/v1/audit-logs', auditLogRoutes);
  server.use('/api/v1/notification-settings', notificationSettingsRoutes);

  // Health check route
  server.get('/api/health', (req, res) => {
    res.send('Citizen Engagement System API is running!');
  });

  // Next.js pages
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start server
  const PORT = 3000;
  initDB().then(() => {
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  });
});
