import React from 'react';
import { Button, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';

const TopBarButtons = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleDashboard = () => {
    history.push('/dashboard');
  };

  return (
    <>
      {/* Logout Button with Icon and Text */}
      <Tooltip title="Logout" arrow>
        <Button
          variant="contained"
          sx={{
            position: 'fixed',
            top: '8px',
            right: '20px',
            zIndex: 9999,
            textTransform: 'none',
            padding: '6px 10px',
            fontSize: '16px',
            backgroundColor: '#e54b34', 
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#e54b34', 
              boxShadow: 6,
            },
          }}
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Tooltip>

      {/* Dashboard Button with Icon and Text */}
      <Tooltip title="Go to Dashboard" arrow>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DashboardIcon />}
          sx={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 9999,
            textTransform: 'none',
            padding: '10px 20px',
            fontSize: '16px',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: 'primary.dark',
              boxShadow: 6,
            },
          }}
          onClick={handleDashboard}
        >
          Dashboard
        </Button>
      </Tooltip>
    </>
  );
};

export default TopBarButtons;
