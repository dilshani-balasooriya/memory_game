import React, { useContext } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import easyImage from '../../img/easyImage.jpg';
import mediumImage from '../../img/Intermediate.jpg';
import hardImage from '../../img/hard.jpg';
import backgroundImage from '../../img/background.png';
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
          fontSize: { xs: '18px', sm: '20px', md: '22px' },
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
        }}
      />
      <Button
        component={Link}
        to="/game"
        variant="contained"
        color="primary"
        sx={{
          width: '80%',
          color: 'white',
          fontFamily: 'Joti One',
          padding: { xs: '8px', sm: '10px' },
          fontSize: { xs: '14px', sm: '16px' },
          '&:hover': {
            backgroundColor: '#ff9800',
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
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        padding: { xs: '80px 20px', sm: '100px 40px' },
        paddingTop: { xs: '105px', sm: '110px' },
        fontFamily: 'Joti One',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: 80, right: 20 }}>
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          color="secondary"
          sx={{
            color: 'white',
            fontFamily: 'Joti One',
            padding: { xs: '8px 16px', sm: '10px 20px' },
            fontSize: { xs: '14px', sm: '16px' },
            '&:hover': {
              backgroundColor: '#ff9800',
            },
          }}
        >
          View Dashboard
        </Button>
      </Box>

      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontFamily: 'Joti One',
          marginBottom: '40px',
          fontSize: { xs: '20px', sm: '24px' },
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
