// src/pages/Auth/Register.js
import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Switch,
  FormControlLabel,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { register as registerUser } from '../../services/authService';

const Register = () => {
  const [isCompany, setIsCompany] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    employee: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleToggle = () => {
    setIsCompany((prev) => !prev);
    setFormData({
      username: '',
      name: '',
      surname: '',
      patronymic: '',
      email: '',
      employee: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    // Валидация обязательных полей
    if (!formData.username || !formData.name || !formData.email || !formData.password) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }
    if (!isCompany) {
      if (!formData.surname || !formData.patronymic) {
        setError('Пожалуйста, заполните фамилию и отчество');
        return;
      }
      if (!formData.employee) {
        setError('Пожалуйста, укажите компанию, в которой работаете');
        return;
      }
    }

    try {
      // Формируем данные для отправки
      const payload = {
        username: formData.username,
        name: formData.name,
        surname: isCompany ? null : formData.surname,
        patronymic: isCompany ? null : formData.patronymic,
        email: formData.email,
        password: formData.password,
        is_company: isCompany,
        employee: isCompany ? null : formData.employee,
      };

      const data = await registerUser(payload);
      setSuccess('Регистрация прошла успешно! Теперь войдите в систему.');
      setFormData({
        username: '',
        name: '',
        surname: '',
        patronymic: '',
        email: '',
        employee: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка при регистрации');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">
          Регистрация {isCompany ? 'компании' : 'пользователя'}
        </Typography>

        <FormControlLabel
          control={<Switch checked={isCompany} onChange={handleToggle} color="primary" />}
          label={isCompany ? 'Регистрация как компания' : 'Регистрация как пользователь'}
          sx={{ mt: 2 }}
        />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth id="username" label="Имя пользователя" name="username" value={formData.username} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth id="name" label={isCompany ? 'Название компании' : 'Имя'} name="name" value={formData.name} onChange={handleChange} />
            </Grid>

            {!isCompany && (
              <>
                <Grid item xs={12}>
                  <TextField required fullWidth id="surname" label="Фамилия" name="surname" value={formData.surname} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="patronymic" label="Отчество" name="patronymic" value={formData.patronymic} onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="employee" label="Компания, в которой работаете" name="employee" value={formData.employee} onChange={handleChange} />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <TextField required fullWidth id="email" label="Email адрес" name="email" type="email" value={formData.email} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="password" label="Пароль" type="password" id="password" value={formData.password} onChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <TextField required fullWidth name="confirmPassword" label="Подтвердите пароль" type="password" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
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
