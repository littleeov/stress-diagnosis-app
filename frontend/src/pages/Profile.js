import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { fetchUserProfile, updateUserProfile, fetchLastAssessment, fetchCompanyStats } from '../api/userService';

const COLORS = ['#00B454', '#FF3900'];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [lastAssessment, setLastAssessment] = useState(null);
  const [companyStats, setCompanyStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const userProfile = await fetchUserProfile();

        // Формируем fullName из surname, name, patronymic
        const fullName = [userProfile.surname, userProfile.name, userProfile.patronymic]
          .filter(Boolean)
          .join(' ');

        // Для компании используем username, для пользователя — employee
        const company = userProfile.is_company ? userProfile.username : userProfile.employee || '';

        setProfileData(userProfile);
        setFormData({
          ...userProfile,
          fullName,
          company,
        });
        setIsCompany(userProfile.is_company);

        const last = await fetchLastAssessment();
        setLastAssessment(last);

        if (userProfile.is_company) {
          const stats = await fetchCompanyStats();
          setCompanyStats(stats);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных профиля', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // При сохранении отправляем поля, которые backend ожидает
      const dataToSave = {
        surname: formData.surname,
        name: formData.name,
        patronymic: formData.patronymic,
        username: formData.username,
        employee: formData.employee,
        // Если нужно, добавьте другие поля
      };
      await updateUserProfile(dataToSave);
      setProfileData({ ...profileData, ...dataToSave });
      setEditMode(false);
    } catch (error) {
      console.error('Ошибка сохранения профиля', error);
    }
  };

  if (loading) return <CircularProgress sx={{ mt: 4, display: 'block', mx: 'auto' }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Профиль {isCompany ? 'компании' : 'пользователя'}
      </Typography>

      {/* Форма профиля с редактированием */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap">
          {editMode ? (
            <>
              <TextField
                label="ФИО"
                name="fullName"
                value={formData.fullName || ''}
                onChange={handleChange}
                fullWidth
                sx={{ minWidth: 300 }}
                disabled
              />
              {isCompany ? (
                <TextField
                  label="Название компании"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
                  disabled
                />
              ) : (
                <TextField
                  label="Компания"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
                  disabled
                />
              )}
              <Button variant="contained" onClick={handleSave}>
                Сохранить
              </Button>
              <Button variant="outlined" onClick={() => setEditMode(false)}>
                Отмена
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{formData.fullName}</Typography>
                <Typography color="text.secondary">{formData.company}</Typography>
              </Box>
              <Button variant="outlined" onClick={() => setEditMode(true)}>
                Редактировать
              </Button>
            </>
          )}
        </Stack>
      </Paper>

      {/* Последняя диагностика */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Последний результат диагностики стресса
        </Typography>
        {lastAssessment ? (
          <>
            <Typography sx={{ mb: 2 }}>
              Результат: {lastAssessment.stress_score}
            </Typography>
          </>
        ) : (
          <Typography>Нет данных</Typography>
        )}
      </Paper>

      {/* Статистика компании */}
      {isCompany && companyStats && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Статистика сотрудников
          </Typography>
          <Typography>Процент сотрудников в стрессе: {companyStats.stressed_percent.toFixed(1)}%</Typography>
          <Typography>Процент сотрудников без стресса: {companyStats.no_stress_percent.toFixed(1)}%</Typography>

          <PieChart width={300} height={250}>
            <Pie
              data={[
                { name: 'В стрессе', value: companyStats.stressed_percent },
                { name: 'Без стресса', value: companyStats.no_stress_percent },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Последние результаты сотрудников
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Имя сотрудника</TableCell>
                  <TableCell>Результат</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {companyStats.employees_results.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.stress_score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Profile;
