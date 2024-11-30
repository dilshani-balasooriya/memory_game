import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import backgroundImage from '../../img/background.png';
import loginImage from '../../img/LoginImage.jpeg';

const Signin = () => {
  // Access authentication context
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const history = useHistory();

  // State to manage form inputs
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // State to manage Snackbar visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { email, password } = user;

  // Effect to handle authentication and errors
  useEffect(() => {
    // Redirect to levels page if authenticated
    if (isAuthenticated) {
      history.push('/levels');
    }
    // Show error message if credentials are invalid
    if (error === 'invalid credentials') {
      setSnackbarOpen(true);
      clearErrors();
    }
  }, [error, isAuthenticated, history, clearErrors]);

  // Handle input change
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    // Call login function from AuthContext
    login({
      email,
      password,
    });
  };

  // Handle Snackbar close action
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        pt: { xs: 8, sm: 10 }, 
      }}
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {/* Background Image Container */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: { xs: '10px 10px 0 0', md: '10px 0 0 10px' },
        }}
      />

      {/* Form Container */}
      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          px: 2,
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
          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Joti One, cursive',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Sign In
          </Typography>

          {/* Email Input */}
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
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
          />

          {/* Password Input */}
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
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(0, 0, 0, 0.5)',
                },
                '&:hover fieldset': {
                  borderColor: 'blue',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'blue',
                },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: '20px',
              backgroundColor: 'red',
              '&:hover': {
                backgroundColor: 'darkred',
              },
              py: 1.5, // Button padding
            }}
          >
            Sign In
          </Button>

          {/* Link to Register */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>
              Register now
            </Link>
          </Typography>
        </Box>
      </Grid>

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Invalid credentials, please try again."
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
    </Grid>
  );
};

export default Signin;
