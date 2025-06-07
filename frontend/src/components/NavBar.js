import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return null; // или индикатор загрузки

  const isLoggedIn = !!user;
  const isCompany = user?.is_company;

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stress Assessment
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={RouterLink} to="/">
            Главная
          </Button>

          {!isLoggedIn && (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Вход
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Регистрация
              </Button>
            </>
          )}

          {isLoggedIn && !isCompany && (
            <Button color="inherit" component={RouterLink} to="/analysis">
              Диагностика
            </Button>
          )}

          {isLoggedIn && (
            <>
              <Button color="inherit" component={RouterLink} to="/profile">
                Профиль
              </Button>
              <LogoutButton />
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
