import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom'; 
import backgroundImage from '../../img/backgroundImage.jpg'; 

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
        paddingTop: '20px', 
      }}
    >
      <Typography variant="h3" gutterBottom>
        Banana Brain Busters
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          padding: '10px 20px',
          fontSize: '1.5rem',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#ff9800', 
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

