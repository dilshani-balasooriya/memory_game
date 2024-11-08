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
  const { updateCurrentLevel } = historyContext;

  const LevelButton = ({ label, image }) => (
    <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography
        variant="h5"
        component="div"
        sx={{ color: 'white', fontFamily: 'Joti One', marginBottom: '8px' }}
      >
        {label}
      </Typography>
      <Box
        className="level-box"
        sx={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 200, sm: 300, md: 350 },
          width: { xs: 200, sm: 300, md: 350 },
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
          '&:hover': {
            backgroundColor: '#ff9800',
          },
        }}
        onClick={() => updateCurrentLevel(label.toLowerCase())}
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
        padding: '60px',
        fontFamily: 'Joti One',
        position: 'relative',
      }}
    >
      {/* Dashboard Button */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      >
        <Button
          component={Link}
          to="/home"
          variant="contained"
          color="secondary"
          sx={{
            color: 'white',
            fontFamily: 'Joti One',
            '&:hover': {
              backgroundColor: '#ff9800',
            },
          }}
        >
          View Dashboard
        </Button>
      </Box>

      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Joti One', marginBottom: '30px' }}>
        Choose the Level
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', maxWidth: 1100 }}>
        <LevelButton label="Easy" image={easyImage} />
        <LevelButton label="Medium" image={mediumImage} />
        <LevelButton label="Hard" image={hardImage} />
      </Grid>
    </Box>
  );
};

export default Levels;
