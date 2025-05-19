# Citizen Engagement System - Backend Documentation

This document provides comprehensive technical specifications for implementing the backend of the Citizen Engagement System. It includes database schema, API endpoints, authentication flows, and other technical details required for development.

## Table of Contents

1. [Database Schema](#database-schema)
2. [API Endpoints](#api-endpoints)
3. [Authentication Flow](#authentication-flow)
4. [File Storage](#file-storage)
5. [Email Notifications](#email-notifications)
6. [Business Logic](#business-logic)
7. [Security Considerations](#security-considerations)
8. [Performance Considerations](#performance-considerations)

## Database Schema

The system uses MySQL as the primary database. Below is the schema definition for all tables.

### Users Table

\`\`\`sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role ENUM('citizen', 'government', 'admin') NOT NULL DEFAULT 'citizen',
    department_id INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_token VARCHAR(100),
    reset_token VARCHAR(100),
    reset_token_expires DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
\`\`\`

### Departments Table

\`\`\`sql
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
\`\`\`

### Complaints Table

\`\`\`sql
CREATE TABLE complaints (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tracking_id VARCHAR(20) NOT NULL UNIQUE,
    user_id INT,
    submission_type ENUM('complaint', 'feedback', 'suggestion') NOT NULL,
    category VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    status ENUM('new', 'under_review', 'assigned', 'in_progress', 'scheduled', 'resolved', 'closed') NOT NULL DEFAULT 'new',
    priority ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    department_id INT,
    assignee_id INT,
    due_date DATE,
    submitter_name VARCHAR(100),
    submitter_email VARCHAR(100),
    submitter_phone VARCHAR(20),
    submitter_address TEXT,
    is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (assignee_id) REFERENCES users(id) ON DELETE SET NULL
);
\`\`\`

### Attachments Table

\`\`\`sql
CREATE TABLE attachments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    file_size INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
);
\`\`\`

### Updates Table

\`\`\`sql
CREATE TABLE updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    user_id INT,
    update_type ENUM('status_change', 'assignment', 'comment', 'resolution') NOT NULL,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    previous_department_id INT,
    new_department_id INT,
    previous_assignee_id INT,
    new_assignee_id INT,
    comment TEXT,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (previous_department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (new_department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (previous_assignee_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (new_assignee_id) REFERENCES users(id) ON DELETE SET NULL
);
\`\`\`

### Messages Table

\`\`\`sql
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    sender_id INT,
    sender_type ENUM('citizen', 'government', 'system') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL
);
\`\`\`

### Notifications Table

\`\`\`sql
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    complaint_id INT,
    type ENUM('status', 'message', 'resolution', 'submission', 'assignment', 'system') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
);
\`\`\`

### NotificationSettings Table

\`\`\`sql
CREATE TABLE notification_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    status_email BOOLEAN NOT NULL DEFAULT TRUE,
    message_email BOOLEAN NOT NULL DEFAULT TRUE,
    resolution_email BOOLEAN NOT NULL DEFAULT TRUE,
    status_app BOOLEAN NOT NULL DEFAULT TRUE,
    message_app BOOLEAN NOT NULL DEFAULT TRUE,
    resolution_app BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

### Feedback Table

\`\`\`sql
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT NOT NULL,
    user_id INT,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
\`\`\`

### AuditLogs Table

\`\`\`sql
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id INT NOT NULL,
    details TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
\`\`\`

## API Endpoints

The API follows RESTful principles and uses JSON for data exchange. All endpoints are prefixed with `/api/v1`.

### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| POST | `/auth/register` | Register a new user | `{ firstName, lastName, email, password, phone?, address? }` | `{ id, firstName, lastName, email, role, token }` |
| POST | `/auth/login` | Login a user | `{ email, password }` | `{ id, firstName, lastName, email, role, token }` |
| POST | `/auth/logout` | Logout a user | None | `{ success: true }` |
| POST | `/auth/forgot-password` | Request password reset | `{ email }` | `{ success: true }` |
| POST | `/auth/reset-password` | Reset password | `{ token, password }` | `{ success: true }` |
| GET | `/auth/verify-email` | Verify email | Query param: `token` | `{ success: true }` |
| POST | `/auth/resend-verification` | Resend verification email | `{ email }` | `{ success: true }` |

### User Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/users/me` | Get current user | None | User object |
| PUT | `/users/me` | Update current user | User fields | Updated user object |
| GET | `/users/:id` | Get user by ID (admin only) | None | User object |
| PUT | `/users/:id` | Update user (admin only) | User fields | Updated user object |
| DELETE | `/users/:id` | Delete user (admin only) | None | `{ success: true }` |
| GET | `/users` | List users (admin only) | Query params for filtering | Array of user objects with pagination |

### Complaint Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| POST | `/complaints` | Submit a new complaint | Complaint fields | Created complaint object with tracking ID |
| GET | `/complaints/:id` | Get complaint by ID | None | Complaint object with updates and messages |
| PUT | `/complaints/:id` | Update complaint (admin/gov only) | Complaint fields | Updated complaint object |
| GET | `/complaints/track/:trackingId` | Track complaint by tracking ID | None | Complaint object with updates |
| GET | `/complaints` | List complaints | Query params for filtering | Array of complaint objects with pagination |
| POST | `/complaints/:id/attachments` | Add attachment to complaint | Multipart form data | Attachment object |
| DELETE | `/complaints/:id/attachments/:attachmentId` | Delete attachment | None | `{ success: true }` |

### Update Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| POST | `/complaints/:id/updates` | Add update to complaint | Update fields | Created update object |
| GET | `/complaints/:id/updates` | Get updates for complaint | None | Array of update objects |

### Message Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| POST | `/complaints/:id/messages` | Send message | `{ message }` | Created message object |
| GET | `/complaints/:id/messages` | Get messages for complaint | None | Array of message objects |
| PUT | `/messages/:id/read` | Mark message as read | None | Updated message object |

### Notification Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/notifications` | Get user notifications | Query params for filtering | Array of notification objects with pagination |
| PUT | `/notifications/:id/read` | Mark notification as read | None | Updated notification object |
| PUT | `/notifications/read-all` | Mark all notifications as read | None | `{ success: true }` |
| GET | `/notifications/settings` | Get notification settings | None | Settings object |
| PUT | `/notifications/settings` | Update notification settings | Settings fields | Updated settings object |

### Department Endpoints (Admin Only)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| POST | `/departments` | Create department | Department fields | Created department object |
| GET | `/departments/:id` | Get department | None | Department object |
| PUT | `/departments/:id` | Update department | Department fields | Updated department object |
| DELETE | `/departments/:id` | Delete department | None | `{ success: true }` |
| GET | `/departments` | List departments | Query params for filtering | Array of department objects |

### Analytics Endpoints (Admin Only)

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|-------------|----------|
| GET | `/analytics/complaints` | Get complaint statistics | Query params for filtering | Statistics object |
| GET | `/analytics/departments` | Get department performance | Query params for filtering | Performance metrics |
| GET | `/analytics/resolution-time` | Get resolution time metrics | Query params for filtering | Time metrics |
| GET | `/analytics/satisfaction` | Get satisfaction metrics | Query params for filtering | Satisfaction metrics |

## Authentication Flow

The system uses JWT (JSON Web Tokens) for authentication. The authentication flow is as follows:

1. **Registration**:
   - User submits registration form with email, password, and other details
   - System creates a new user record with a hashed password
   - System generates a verification token and sends a verification email
   - User receives a JWT token for immediate login but with limited permissions

2. **Email Verification**:
   - User clicks on the verification link in the email
   - System verifies the token and marks the user's email as verified
   - User gains full access to their account

3. **Login**:
   - User submits email and password
   - System verifies credentials and generates a JWT token
   - Token is returned to the client and stored for subsequent requests

4. **Password Reset**:
   - User requests password reset by providing their email
   - System generates a reset token and sends a reset email
   - User clicks on the reset link and sets a new password
   - System verifies the token, updates the password, and invalidates the token

5. **Token Validation**:
   - Each protected API request includes the JWT token in the Authorization header
   - System validates the token and identifies the user
   - If the token is invalid or expired, the request is rejected

### JWT Structure

\`\`\`json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user_id",
    "name": "User's full name",
    "email": "user@example.com",
    "role": "citizen|government|admin",
    "department": "department_id (for government users)",
    "iat": "issued_at_timestamp",
    "exp": "expiration_timestamp"
  },
  "signature": "..."
}
\`\`\`

## File Storage

The system uses a file storage service for storing attachments. Files are stored with the following structure:

\`\`\`
/uploads
  /complaints
    /{complaint_id}
      /{file_name}
\`\`\`

### File Upload Process

1. Client uploads file to `/complaints/:id/attachments` endpoint
2. Server validates file type and size (max 10MB per file, 5 files per complaint)
3. Server generates a unique filename and stores the file
4. Server creates an attachment record in the database
5. Server returns the attachment details to the client

### Supported File Types

- Images: JPG, PNG, GIF
- Documents: PDF, DOC, DOCX
- Videos: MP4 (max 30 seconds)

## Email Notifications

The system sends email notifications for various events. Email templates are stored in the database and can be customized by administrators.

### Email Types

1. **Account Verification**: Sent when a user registers
2. **Password Reset**: Sent when a user requests a password reset
3. **Complaint Submission**: Sent when a user submits a complaint
4. **Status Update**: Sent when a complaint status changes
5. **New Message**: Sent when a new message is received
6. **Resolution**: Sent when a complaint is resolved
7. **Feedback Request**: Sent when a complaint is resolved to request feedback

### Email Service Integration

The system uses SMTP for sending emails. The SMTP configuration is stored in environment variables:

\`\`\`
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=notifications@example.com
SMTP_PASSWORD=your_password
SMTP_FROM_EMAIL=notifications@example.com
SMTP_FROM_NAME=Citizen Engagement System
\`\`\`

## Business Logic

### Complaint Submission Flow

1. User submits a complaint form
2. System validates the form data
3. System generates a unique tracking ID (format: CES-YYYY-XXXXX)
4. System creates a complaint record in the database
5. System determines the appropriate department based on the category
6. System assigns the complaint to the department
7. System creates an initial update record
8. System sends a confirmation email to the user
9. System creates a notification for the department

### Complaint Assignment Logic

1. New complaints are automatically assigned to departments based on category
2. Department officials can reassign complaints within their department
3. Administrators can reassign complaints to any department
4. When a complaint is reassigned, the system creates an update record
5. The system sends notifications to relevant parties

### Status Update Flow

1. Official updates the status of a complaint
2. System validates the status change
3. System updates the complaint record
4. System creates an update record
5. System sends notifications to the user
6. If the status is changed to "resolved", the system sends a feedback request

### Resolution Time Calculation

The resolution time is calculated as the difference between the complaint creation date and the date when the status is changed to "resolved". The calculation excludes weekends and holidays.

## Security Considerations

### Password Security

- Passwords are hashed using bcrypt with a cost factor of 12
- Password requirements: minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
- Password reset tokens expire after 24 hours

### API Security

- All API endpoints are protected with JWT authentication except for public endpoints
- Rate limiting is applied to prevent brute force attacks
- CORS is configured to allow only specific origins
- Input validation is performed on all API requests
- SQL injection protection is implemented using prepared statements

### Data Protection

- Sensitive data is encrypted in the database
- Personal information is only accessible to authorized users
- Data is backed up regularly
- Audit logs are maintained for all sensitive operations

## Performance Considerations

### Database Indexing

The following indexes should be created for optimal performance:

\`\`\`sql
-- Users table
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_department_id ON users(department_id);

-- Complaints table
CREATE INDEX idx_complaints_tracking_id ON complaints(tracking_id);
CREATE INDEX idx_complaints_user_id ON complaints(user_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_category ON complaints(category);
CREATE INDEX idx_complaints_department_id ON complaints(department_id);
CREATE INDEX idx_complaints_created_at ON complaints(created_at);

-- Updates table
CREATE INDEX idx_updates_complaint_id ON updates(complaint_id);
CREATE INDEX idx_updates_user_id ON updates(user_id);
CREATE INDEX idx_updates_created_at ON updates(created_at);

-- Messages table
CREATE INDEX idx_messages_complaint_id ON messages(complaint_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Notifications table
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_complaint_id ON notifications(complaint_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
\`\`\`

### Caching Strategy

- API responses are cached using Redis with appropriate TTL
- Frequently accessed data like departments and categories are cached
- User sessions are stored in Redis for fast access
- Database query results are cached where appropriate

### Pagination

All list endpoints support pagination with the following query parameters:

- `page`: Page number (default: 1)
- `limit`: Number of items per page (default: 10, max: 100)
- `sort`: Field to sort by (default: created_at)
- `order`: Sort order (asc or desc, default: desc)

Example response format for paginated endpoints:

\`\`\`json
{
  "data": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
\`\`\`

### Background Processing

The following tasks are processed in the background using a job queue:

- Sending email notifications
- Generating reports
- Processing file uploads
- Calculating analytics data

## Deployment Considerations

### Environment Variables

The following environment variables should be configured:

\`\`\`
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=citizen_engagement
DB_USER=root
DB_PASSWORD=password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h

# SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=notifications@example.com
SMTP_PASSWORD=your_password
SMTP_FROM_EMAIL=notifications@example.com
SMTP_FROM_NAME=Citizen Engagement System

# File Storage
UPLOAD_DIR=/path/to/uploads
MAX_FILE_SIZE=10485760 # 10MB
MAX_FILES_PER_COMPLAINT=5

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Server
PORT=3000
NODE_ENV=production
\`\`\`

### Database Migration

Database migrations should be managed using a migration tool like Knex.js or Sequelize. The migration scripts should be version-controlled and run as part of the deployment process.

### Backup Strategy

- Database backups should be performed daily
- File backups should be performed weekly
- Backups should be stored in a secure location
- Backup restoration should be tested regularly

## Conclusion

This document provides a comprehensive guide for implementing the backend of the Citizen Engagement System. It covers the database schema, API endpoints, authentication flow, and other technical details required for development. The system is designed to be secure, scalable, and maintainable.
