# Event Management Backend

A Node.js/Express backend for managing events with MySQL database and image upload functionality.

## Features

- RESTful API endpoints for CRUD operations
- Image upload handling with Multer
- MySQL database with Sequelize ORM
- Search, filter, and pagination for events
- Proper error handling
- CORS enabled for frontend integration

## Tech Stack

- Node.js with Express
- MySQL for database
- Sequelize ORM
- Multer for file uploads
- CORS for cross-origin requests
- Morgan for request logging

## Prerequisites

- Node.js 14.x or higher
- MySQL 5.7 or higher
- npm 6.x or higher

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
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

4. Start the server:
   ```bash
   npm start
   ```

The server will be running at `http://localhost:5000`

## Project Structure

```
src/
├── models/             # Database models
│   ├── index.js       # Model initialization
│   └── event.model.js # Event model definition
├── routes/
│   └── event.routes.js # Event routes
└── index.js           # Server entry point
```

## API Endpoints

### Events
- `GET /api/events` - Get all events
  - Query params:
    - `page`: Page number (default: 1)
    - `limit`: Items per page (default: 10)
    - `sortBy`: Sort field (name, startDate)
    - `order`: Sort order (ASC, DESC)
    - `search`: Search term
    - `startDate`: Filter by start date
    - `endDate`: Filter by end date

- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event
  - Accepts multipart/form-data with images
- `PUT /api/events/:id` - Update event
  - Accepts multipart/form-data with images
- `DELETE /api/events/:id` - Delete event

## Image Upload

- Images are stored in the `uploads/` directory
- Maximum 5 images per event
- Supported formats: JPG, JPEG, PNG
- Maximum file size: 5MB

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error
