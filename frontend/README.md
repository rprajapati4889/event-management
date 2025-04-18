# Event Management Frontend

A React-based frontend application for managing events with a modern Material-UI interface.

## Features

- View all events with search and filtering
- Create new events with image uploads
- Edit existing events
- Delete events
- Image preview and gallery view
- Responsive design for all screen sizes

## Tech Stack

- React 18 with TypeScript
- Material-UI v5 for components and styling
- React Router v6 for routing
- Formik & Yup for form handling and validation
- Axios for API requests
- Date-fns for date formatting

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # React components
│   ├── EventList.tsx   # List all events
│   ├── EventForm.tsx   # Create/Edit event form
│   ├── EventDetail.tsx # Event details view
│   └── Navbar.tsx      # Navigation bar
├── App.tsx             # Main app component
└── index.tsx          # Entry point
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## API Integration

The frontend connects to the backend API running at `http://localhost:5000`. Make sure the backend server is running before starting the frontend.
