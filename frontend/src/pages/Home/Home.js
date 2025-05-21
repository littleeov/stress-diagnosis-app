// src/pages/Home/Home.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
          minHeight: '80vh',
          backgroundColor: 'rgba(158, 238, 136, 0.8)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 700,
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          NoStressAPP
        </Typography>
        <Typography variant="h6" color="text.secondary">
           Мы поможем разобраться в своем состоянии.
            Используем нейронные сети для лучшего понимания ментального здоровья.
            Прояви заботу о себе, ответив на пару вопросов.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
