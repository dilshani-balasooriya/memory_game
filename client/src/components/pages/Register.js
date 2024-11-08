import React, { useState, useContext, useEffect } from 'react';
import { Grid, Box, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import backgroundImage from '../../img/background.png';
import registerImage from '../../img/loginImage.jpg';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { name, email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Email already exists') {
      setSnackbarOpen(true);
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    register({
      name,
      email,
      password,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container style={{ minHeight: '100vh' }} alignItems="center" justifyContent="center">
      {/* Left Container with Background Image */}
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
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
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          height: '80vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: 0,
        }}
      >
        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{
            maxWidth: 400,
            width: '85%',
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            padding: 4,
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
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: '20px',
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'darkred',
              },
              py: 1.5,
            }}
          >
            Register
          </Button>
        </Box>
      </Grid>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          Email already exists.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Register;
