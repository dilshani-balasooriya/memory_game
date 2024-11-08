import React, { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Snackbar } from '@mui/material';
import AuthContext from '../../context/auth/authContext';
import backgroundImage from '../../img/background.png';
import loginImage from '../../img/loginImage.jpg';

const Signin = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const history = useHistory();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/levels');
    }
    if (error === 'invalid credentials') {
      setSnackbarOpen(true);
      clearErrors();
    }
  }, [error, isAuthenticated, history, clearErrors]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container style={{ minHeight: '100vh' }} justifyContent="center" alignItems="center" spacing={2}>
      {/* Image container */}
      <Grid
        item
        xs={12}
        md={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          height: '80vh',
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: { xs: '10px 10px 0 0', md: '10px 0 0 10px' },
        }}
      />

      {/* Form container */}
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
              mb: 2,
            }}
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
            sx={{
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
              mb: 2,
            }}
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
            Sign In
          </Button>
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
