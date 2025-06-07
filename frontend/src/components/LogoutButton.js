import React from 'react';
import { Button } from '@mui/material';
import { logout } from '../api/authService';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      // Здесь можно очистить состояние пользователя, если используете context или redux
    } catch (err) {
      console.error('Ошибка выхода', err);
    }
  };

  return (
    <Button color="inherit" onClick={handleLogout}>
      Выйти
    </Button>
  );
};

export default LogoutButton;
