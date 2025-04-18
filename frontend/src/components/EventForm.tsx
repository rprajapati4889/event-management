import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup
    .date()
    .min(yup.ref('startDate'), 'End date must be after start date')
    .required('End date is required'),
  totalGuests: yup
    .number()
    .positive('Total guests must be positive')
    .nullable(),
});

const EventForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  interface EventFormValues {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  totalGuests: string;
  [key: string]: string;
}

const formik = useFormik<EventFormValues>({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      totalGuests: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (values[key]) {
            formData.append(key, values[key]);
          }
        });
        
        images.forEach((image) => {
          formData.append('images', image);
        });

        if (id) {
          await axios.put(`http://localhost:5000/api/events/${id}`, formData);
        } else {
          await axios.post('http://localhost:5000/api/events', formData);
        }

        navigate('/');
      } catch (error) {
        setError('Failed to save event. Please try again.');
      }
    },
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/events/${id}`);
          const event = response.data;
          formik.setValues({
            name: event.name,
            description: event.description,
            startDate: event.startDate.split('T')[0],
            endDate: event.endDate.split('T')[0],
            totalGuests: event.totalGuests || '',
          });
          setPreviewUrls(event.images);
        } catch (error) {
          setError('Failed to fetch event details');
        }
      }
    };

    fetchEvent();
  }, [id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages((prev) => [...prev, ...newImages]);
      
      const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Event' : 'Create Event'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Event Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="startDate"
                label="Start Date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                name="endDate"
                label="End Date"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="totalGuests"
                label="Total Guests (Optional)"
                value={formik.values.totalGuests}
                onChange={formik.handleChange}
                error={formik.touched.totalGuests && Boolean(formik.errors.totalGuests)}
                helperText={formik.touched.totalGuests && formik.errors.totalGuests}
              />
            </Grid>

            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                multiple
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload">
                <Button variant="contained" component="span">
                  Upload Images
                </Button>
              </label>
            </Grid>

            {previewUrls.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {previewUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url.startsWith('http') ? url : `http://localhost:5000/${url}`}
                      alt={`Preview ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {id ? 'Update Event' : 'Create Event'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EventForm;
