import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoutButton from "./LogoutButton";
import { UserContext } from '../context/UserContext';

const NavBar = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return (
    <AppBar position="static" enableColorOnDark
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText', // чтобы текст был читаемым
        }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            NoStress
          </Typography>
          <CircularProgress color="inherit" size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static" enableColorOnDark
      sx={{
        bgcolor: 'primary.main',
        color: 'primary.contrastText', // чтобы текст был читаемым
        }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          NoStress
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ fontSize: '1.1rem' }}>
            Главная
          </Button>

          {!user && (
            <>
              <Button color="inherit" component={RouterLink} to="/login" sx={{ fontSize: '1.1rem' }}>
                Вход
              </Button>
              <Button color="inherit" component={RouterLink} to="/register" sx={{ fontSize: '1.1rem' }}>
                Регистрация
              </Button>
            </>
          )}

          {user && (
            <>
              {!user?.is_company && (
                <Button color="inherit" component={RouterLink} to="/analysis" sx={{ fontSize: '1.1rem' }}>
                    Диагностика
                 </Button>
                )}
              <Button color="inherit" component={RouterLink} to="/profile" sx={{ fontSize: '1.1rem' }}>
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
