import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { logout } from '../api/authService';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Ошибка выхода', err);
    }
  };

  return (
    <Button color="inherit" onClick={handleLogout} sx={{ fontSize: '1.1rem' }}>
      Выйти
    </Button>
  );
};

export default LogoutButton;

