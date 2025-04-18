import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Navbar from './components/Navbar';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/events/create" element={<EventForm />} />
          <Route path="/events/edit/:id" element={<EventForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
