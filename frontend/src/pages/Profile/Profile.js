import React, { useEffect, useState } from 'react';
import { getProfile } from '../../services/userService';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Имя: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Другие данные */}
    </div>
  );
};

export default Profile;
