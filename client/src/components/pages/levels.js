import React, { useContext } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import easyImage from '../../img/easy.jpg';
import mediumImage from '../../img/medium.jpg';
import hardImage from '../../img/hard.jpg';
import backgroundImage from '../../img/forest1.jpg';
import HistoryContext from '../../context/history/historyContext';

const Levels = () => {
  const historyContext = useContext(HistoryContext);
  const { updateCurrentLevel } = historyContext || {};

  const LevelButton = ({ label, image }) => (
    <Grid
      item
      xs={12}
      sm={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{
          color: 'white', 
          fontFamily: 'Joti One',
          marginBottom: '8px',
          fontSize: { xs: '22px', sm: '26px', md: '30px' }, 
          fontWeight: 'bold',
        }}
      >
        {label}
      </Typography>
      <Box
        className="level-box"
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 180, sm: 250, md: 300 },
          width: { xs: 180, sm: 250, md: 300 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.3)',
          marginBottom: '10px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)',  
            boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.4)', 
          },
        }}
      />
      <Button
        component={Link}
        to="/game"
        variant="contained"
        sx={{
          width: '80%',
          color: 'white', 
          fontFamily: 'Joti One',
          padding: { xs: '10px', sm: '12px' },
          fontSize: { xs: '16px', sm: '18px' }, 
          fontWeight: 'bold', 
          backgroundColor: '#9c27b0', 
          '&:hover': {
            backgroundColor: '#7b1fa2', 
            boxShadow: '0px 4px 12px rgba(123, 31, 162, 0.6)', 
            transform: 'scale(1.05)', 
            transition: 'transform 0.2s ease, background-color 0.2s ease',
          },
        }}
        onClick={() => {
          if (updateCurrentLevel) {
            updateCurrentLevel(label.toLowerCase());
          } else {
            console.warn('updateCurrentLevel function is not available');
          }
        }}
      >
        Select {label}
      </Button>
    </Grid>
  );

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: { xs: '80px 20px', sm: '100px 40px' },
        paddingTop: { xs: '105px', sm: '110px' },
        fontFamily: 'Joti One',
      }}
    >
      {/* Blue overlay for the background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 255, 0.3)', 
          zIndex: -1, 
        }}
      />
      
      {/*Level Selction button event */}
      <Box
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -2,
          filter: 'blur(1px)', 
        }}
      />
      
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Joti One',
          marginBottom: '40px',
          fontSize: { xs: '24px', sm: '30px' }, 
          color: 'white', 
          fontWeight: 'bold', 
        }}
      >
        Choose the Level
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ width: '100%', maxWidth: 1100 }}
      >
        <LevelButton label="Easy" image={easyImage} />
        <LevelButton label="Medium" image={mediumImage} />
        <LevelButton label="Hard" image={hardImage} />
      </Grid>
    </Box>
  );
};

export default Levels;
