import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authService';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  backgroundColor: '#f0f5f1',
  borderRadius: 30,
  padding: 4,
  '& .MuiToggleButton-root': {
    borderRadius: 30,
    textTransform: 'none',
    fontWeight: 600,
    color: theme.palette.primary.main,
    flex: 1,
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      boxShadow: theme.shadows[3],
    },
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    username: '',
    surname: '',
    name: '',
    patronymic: '',
    email: '',
    password: '',
    employee: '',
    companyName: '',
  });

  const handleUserType = (event, newType) => {
    if (newType !== null) {
      setUserType(newType);
      if (newType === 'company') {
        setFormData((prev) => ({ ...prev, employee: '' }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ userType, ...formData });
      navigate('/login');
    } catch (err) {
      console.error('Ошибка регистрации', err);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Регистрация
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <StyledToggleButtonGroup
          value={userType}
          exclusive
          onChange={handleUserType}
          aria-label="Тип пользователя"
          sx={{ width: '100%', maxWidth: 400 }}
        >
          <ToggleButton value="user" aria-label="Пользователь">
            Пользователь
          </ToggleButton>
          <ToggleButton value="company" aria-label="Компания">
            Компания
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {userType === 'user' && (
            <>
              <TextField
                label="Фамилия"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Имя"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Отчество"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleChange}
                fullWidth
              />
            </>
          )}

          {userType === 'company' && (
            <>
              <TextField
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Название компании"
                name="companyName"
                value={formData.companyName || ''}
                onChange={handleChange}
                fullWidth
                required
              />
            </>
          )}

          {userType === 'user' && (
            <TextField
              label="Логин"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              required
            />
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />

          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
          />

          {userType === 'user' && (
            <TextField
              label="Работодатель"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              fullWidth
            />
          )}

          <Button type="submit" variant="contained" size="large" fullWidth>
            Зарегистрироваться
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default Register;
