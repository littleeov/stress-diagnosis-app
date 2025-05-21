import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'rgba(43, 128, 7, 0.89)' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          NoStressAPP
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/analysis">Анализ</Button>
          <Button color="inherit" component={Link} to="/profile">Профиль</Button>
          <Button color="inherit" component={Link} to="/login">Вход</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;