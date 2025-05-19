# Citizen Engagement System

A modern web application for citizens to submit, track, and manage complaints and feedback to government departments. Built with Next.js, Express, MySQL, and Tailwind CSS.

## Features
- User registration and authentication (JWT)
- Submit and track complaints
- Dashboard with real-time stats
- Profile management
- Department and feedback management
- Notifications system
- Admin and citizen roles
- Responsive, modern UI

## Tech Stack
- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MySQL server

### Installation
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd citizen-engagement-system
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure the database:**
   - Create a MySQL database named `citizen_engagement_system`.
   - Update your MySQL credentials in `server.js` and route files if needed.
   - The database tables will be initialized automatically on first run.
4. **Start the application:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage
- Register a new account or log in as an existing user.
- Submit complaints, view status, and receive notifications.
- Admins can manage departments, users, and view all complaints.

## Project Structure
- `/app` - Next.js frontend pages and components
- `/routes` - Express backend API routes
- `/db` - Database initialization scripts
- `/components` - Shared React components
- `/public` - Static assets

## Environment Variables
You can use a `.env` file to store sensitive configuration (e.g., JWT secret, DB credentials).

## Contribution
Contributions are welcome! Please open issues or submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.
