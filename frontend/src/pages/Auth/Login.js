import React, { useState } from 'react';
import { Button, TextField, Container, Box, Typography, Avatar, FormControlLabel, Checkbox, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const data = await login({ email, password });
      console.log('Успешный вход:', data);
      // Здесь можно сохранить токен или состояние авторизации
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при входе');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Вход в систему</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField margin="normal" required fullWidth label="Email адрес" autoComplete="email" autoFocus
            value={email} onChange={e => setEmail(e.target.value)} />
          <TextField margin="normal" required fullWidth label="Пароль" type="password" autoComplete="current-password"
            value={password} onChange={e => setPassword(e.target.value)} />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Запомнить меня" />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Войти</Button>
          <Grid container>
            <Grid item xs><Link href="#" variant="body2">Забыли пароль?</Link></Grid>
            <Grid item><Link href="/register" variant="body2">Нет аккаунта? Зарегистрируйтесь</Link></Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
