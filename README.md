# Event Management System

A full-stack application for managing events with CRUD operations and image uploads. The system allows users to create, view, edit, and delete events with multiple image uploads.

## Project Overview

This project consists of two main parts:
1. A React frontend with Material-UI
2. A Node.js/Express backend with MySQL database

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create `.env` file:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=event_management
   DB_PORT=3306
   ```

3. Set up the database:
   ```bash
   mysql -u root -p < setup_db.sql
   ```

4. Start the backend:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend:
   ```bash
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Features

1. Event Management
   - Create events with name, description, dates, and guest count
   - Upload multiple images for each event (up to 5)
   - View all events with pagination
   - Search events by name
   - Filter events by date range
   - Sort events by name or date
   - Edit existing events
   - Delete events

2. Image Management
   - Upload multiple images per event
   - View images in a grid layout
   - Image preview in modal
   - Automatic image cleanup on event deletion

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI components
- Formik & Yup for form validation
- React Router for routing
- Axios for API calls

### Backend
- Node.js with Express
- MySQL with Sequelize ORM
- Multer for file uploads
- CORS enabled
- Morgan for logging

## Project Structure

```
event-management/
├── backend/           # Backend server code
│   ├── src/          # Source files
│   ├── uploads/      # Uploaded images
│   └── README.md     # Backend documentation
├── frontend/         # Frontend React app
│   ├── src/         # Source files
│   └── README.md    # Frontend documentation
└── README.md        # Main documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
