import React, { useState } from 'react';
import { login } from '../../api/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await login(form);
      // Сохраняем токен (если backend возвращает)
      localStorage.setItem('token', response.data.token || '');
      setError('');
      navigate('/profile'); // перенаправление после успешного входа
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} required />
      <button type="submit">Войти</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default Login;

