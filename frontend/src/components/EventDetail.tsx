import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageList,
  ImageListItem,
} from '@mui/material';
import axios from 'axios';
interface Event {
  id: string;
  name: string;
  description: string;
  images: string[];
  startDate: string;
  endDate: string;
  totalGuests?: number;
}

const EventDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
        navigate('/');
      }
    };

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {event.name}
        </Typography>



        <Box sx={{ my: 3 }}>
          <ImageList sx={{ width: '100%', height: 'auto' }} cols={3} rowHeight={200}>
            {event.images.map((image, index) => (
              <ImageListItem
                key={index}
                sx={{ cursor: 'pointer' }}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={`http://localhost:5000/${image}`}
                  alt={`Event ${index + 1}`}
                  loading="lazy"
                  style={{ height: '200px', width: '100%', objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">Description</Typography>
            <Typography paragraph>{event.description}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Start Date</Typography>
            <Typography>
              {new Date(event.startDate).toLocaleDateString()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">End Date</Typography>
            <Typography>
              {new Date(event.endDate).toLocaleDateString()}
            </Typography>
          </Grid>

          {event.totalGuests && (
            <Grid item xs={12}>
              <Typography variant="h6">Total Guests</Typography>
              <Typography>{event.totalGuests}</Typography>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/events/edit/${event.id}`)}
          >
            Edit Event
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete Event
          </Button>
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {selectedImage && (
            <img
              src={`http://localhost:5000/${selectedImage}`}
              alt="Event"
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedImage(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetail;
