// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения профиля
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // или откуда храните токен
        const response = await axios.get('/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Ошибка загрузки профиля');
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div>{error}</div>;
  if (!profile) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p><strong>Имя:</strong> {profile.name}</p>
      <p><strong>Фамилия:</strong> {profile.surname}</p>
      <p><strong>Отчество:</strong> {profile.patronymic}</p>
      <p><strong>Логин:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Компания:</strong> {profile.is_company ? 'Да' : 'Нет'}</p>
      { !profile.is_company && <p><strong>Работодатель:</strong> {profile.employee}</p> }
      <p><strong>Дата регистрации:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default Profile;

