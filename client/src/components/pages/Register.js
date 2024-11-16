import React, { useState, useContext, useEffect } from 'react';
import { Grid, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import backgroundImage from '../../img/background.png';
import registerImage from '../../img/loginImage.jpg';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const history = useHistory();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { name, email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/signin'); // Redirects to the Sign In page on successful registration
    }

    if (error === 'Email already exists') {
      setSnackbarOpen(true);
      clearErrors();
    }
  }, [error, isAuthenticated, history, clearErrors]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, sm: 10 }, // Space below the navbar
      }}
      justifyContent="center"
      alignItems="center"
    >
      {/* Left Container with Background Image */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          height: '80vh',
          backgroundImage: `url(${registerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: { xs: '10px 10px 0 0', md: '10px 0 0 10px' },
        }}
      />

      {/* Right Container with Registration Form */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          height: '80vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            maxWidth: 400,
            width: '100%',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            p: 4,
            borderRadius: 2,
            boxShadow: 5,
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
            Register
          </Typography>

          <TextField
            id="name"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={onChange}
            value={name}
            sx={{ mb: 2 }}
          />

          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={onChange}
            value={email}
            sx={{ mb: 2 }}
          />

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onChange={onChange}
            value={password}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: '20px',
              bgcolor: 'red',
              '&:hover': {
                bgcolor: 'darkred',
              },
              py: 1.5,
            }}
          >
            Register
          </Button>

          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already Have an Account?{' '}
            <Link to="/signin" style={{ color: 'blue', textDecoration: 'underline' }}>
              Login Now
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Snackbar for Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Email already exists.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Register;
