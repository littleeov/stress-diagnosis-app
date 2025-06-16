// src/pages/Home.js
import React from 'react';
import { Container, Typography, Button, Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>
        Добро пожаловать в NoStress
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Удобное web-приложение для диагностики стресса с выводом статистики и просмотром истории диагностик.
        Предоставляет возможность компаниям следить за психоэмоциональным состоянием сотрудников.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" size="large" onClick={() => navigate('/login')}>
          Войти
        </Button>
        <Button variant="outlined" color="secondary" size="large" onClick={() => navigate('/register')}>
          Зарегистрироваться
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;
