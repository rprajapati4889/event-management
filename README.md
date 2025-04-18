# Event Management System

A full-stack application for managing events with CRUD operations and image uploads.

## Tech Stack

### Backend
- Node.js with Express
- MySQL with Sequelize ORM
- Multer for file uploads

### Frontend
- React with TypeScript
- Material-UI for components
- Formik & Yup for form validation
- React Router for routing
- Axios for API calls

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the backend directory with the following:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=event_management
   DB_PORT=3306
   ```

3. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend development server:
   ```bash
   npm start
   ```

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
   - Placeholder images for events without photos

## API Endpoints

### Events
- `GET /api/events` - Get all events with search, filter, and pagination
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

## Testing

Use the provided Postman collection (`postman_collection.json`) to test all API endpoints.
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```

2. Start the frontend development server:
   ```bash
   npm start
   ```

## Features
- User Authentication
- Event CRUD Operations
- Multiple Image Upload
- Event Listing with Pagination
- Sorting and Filtering
- Search Functionality
- Input Validation (Client & Server)
