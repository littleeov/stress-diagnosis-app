import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { register } from '../../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    try {
      const data = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        is_company: false, // или true, если нужно
      });
      setSuccess('Регистрация прошла успешно! Теперь войдите в систему.');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при регистрации');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Регистрация</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField name="username" label="Имя пользователя" required fullWidth value={formData.username} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" label="Email адрес" required fullWidth value={formData.email} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="password" label="Пароль" type="password" required fullWidth value={formData.password} onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField name="confirmPassword" label="Подтвердите пароль" type="password" required fullWidth value={formData.confirmPassword} onChange={handleChange} />
            </Grid>
          </Grid>
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Зарегистрироваться</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
