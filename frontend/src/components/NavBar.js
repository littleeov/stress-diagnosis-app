// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Stress Assessment
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={RouterLink} to="/">
            Главная
          </Button>
          <Button color="inherit" component={RouterLink} to="/login">
            Вход
          </Button>
          <Button color="inherit" component={RouterLink} to="/register">
            Регистрация
          </Button>
          <Button color="inherit" component={RouterLink} to="/analysis">
          Диагностика
        </Button>
        <Button color="inherit" component={RouterLink} to="/profile">
          Профиль
        </Button>
          <LogoutButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
