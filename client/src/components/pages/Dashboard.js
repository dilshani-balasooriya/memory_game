import React, { useContext } from 'react';
import { Card, CardContent, Typography, Grid, Container, Box, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import HistoryContext from '../../context/history/historyContext';
import backgroundImage from '../../img/win.png';

const Dashboard = () => {
  const history = useHistory();
  const { games } = useContext(HistoryContext);

  const goBack = () => {
    history.push('/levels');
  };

  const countGamesByLevel = (level) => games ? games.filter((game) => game.gameLevel === level).length : 0;

  const totalGames = games ? games.length : 0;
  const easyGames = countGamesByLevel('easy');   
  const mediumGames = countGamesByLevel('medium'); 
  const advancedGames = countGamesByLevel('advanced'); 

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1c1e5a 30%, #5b1e7d 90%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontFamily: 'Joti One, sans-serif',
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 } }}>
        <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'black', padding: { xs: '16px', sm: '24px' }, borderRadius: '12px', boxShadow: 5 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <Typography variant="h4" align="left" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.5rem' }, mr: 2 }}>
                Welcome Back!
              </Typography>
              <img src={backgroundImage} alt="icon" style={{ width: '90px', height: '90px', borderRadius: '50%' }} />
            </Box>

            <Typography variant="h6" align="center" sx={{ mb: 3, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              You have played {totalGames} {totalGames === 1 ? 'game' : 'games'} so far!
            </Typography>

            <Typography variant="h5" align="center" sx={{ mt: 2, fontWeight: 'medium', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
              Games by Difficulty:
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: '8px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Easy</Typography>
                    <Typography variant="body1" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{easyGames}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#fff3e0', borderRadius: '8px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Medium</Typography>
                    <Typography variant="body1" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{mediumGames}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ backgroundColor: '#ffebee', borderRadius: '8px', boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Advanced</Typography>
                    <Typography variant="body1" align="center" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>{advancedGames}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={goBack}
                sx={{
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  padding: { xs: '8px 16px', sm: '12px 24px' },
                  borderRadius: '8px',
                  boxShadow: 3,
                  '&:hover': {
                    backgroundColor: '#ff9800',
                  },
                }}
              >
                Back to Levels
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
