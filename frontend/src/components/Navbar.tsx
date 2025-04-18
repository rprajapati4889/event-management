import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Event Management
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/events/create">
            Create Event
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
