import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../../img/back4.jpeg';

const Main = () => {
  const history = useHistory();

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        paddingTop: '67px',
      }}
    >
      {/* Background Overlay for Better Readability */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          zIndex: -1,
        }}
      />

      {/* Welcome Text */}
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontFamily: 'Joti One, cursive',
          fontWeight: 'bold',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          letterSpacing: '1px',
          color: 'white',
          marginBottom: '20px', 
        }}
      >
        Welcome to Banana Brain Busters
      </Typography>

      {/* Memory Game Quote */}
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Joti One, cursive',
          fontStyle: 'italic',
          marginBottom: '20px',
          fontWeight: 'lighter',
          fontSize: '1.3rem',
          color: 'white',
          letterSpacing: '0.5px',
          textShadow: '1px 1px 6px rgba(0, 0, 0, 0.7)',
        }}
      >
        "Sharpen your mind, one move at a time."
      </Typography>

      {/* Play Now Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ff9800',
          color: 'white',
          padding: '15px 35px',
          fontSize: '1.7rem',
          borderRadius: '10px',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
          marginTop: '20px', 
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            backgroundColor: '#e68900',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.4)',
            transform: 'scale(1.1)',
          },
        }}
        onClick={() => {
          history.push('/signin');
        }}
      >
        Play Now
      </Button>
    </Box>
  );
};

export default Main;
