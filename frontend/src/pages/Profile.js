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
import { fetchUserProfile, updateUserProfile } from '../api/userService';
import {
  fetchLastStressResult,
  fetchStressStatistics,
  fetchEmployeesResults,
} from '../api/analysisService';

const COLORS = ['#00B454', '#FF3900'];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [lastStressResult, setLastStressResult] = useState(null);
  const [stressStats, setStressStats] = useState(null);
  const [employeesResults, setEmployeesResults] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setProfileData(userProfile);
        setFormData(userProfile);
        setIsCompany(userProfile.type === 'company');

        const lastResult = await fetchLastStressResult();
        setLastStressResult(lastResult);

        const stats = await fetchStressStatistics();
        setStressStats(stats);

        if (userProfile.type === 'company') {
          const employees = await fetchEmployeesResults();
          setEmployeesResults(employees);
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
      await updateUserProfile(formData);
      setProfileData(formData);
      setEditMode(false);
      // Можно добавить уведомление об успешном сохранении
    } catch (error) {
      console.error('Ошибка сохранения профиля', error);
      // Можно добавить уведомление об ошибке
    }
  };

  if (loading)
    return <CircularProgress sx={{ mt: 4, display: 'block', mx: 'auto' }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Профиль {isCompany ? 'компании' : 'пользователя'}
      </Typography>

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
              />
              {isCompany ? (
                <TextField
                  label="Название компании"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
                />
              ) : (
                <TextField
                  label="Компания"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
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

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Последний результат диагностики стресса
        </Typography>
        <Typography sx={{ mb: 2 }}>
          {lastStressResult ? lastStressResult.description : 'Нет данных'}
        </Typography>
        {stressStats && (
          <PieChart width={300} height={250}>
            <Pie
              data={[
                { name: 'Низкий стресс', value: stressStats.low },
                { name: 'Высокий стресс', value: stressStats.high },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
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
        )}
        {stressStats && (
          <Typography>
            Результат: {stressStats.score} из {stressStats.max}
          </Typography>
        )}
      </Paper>

      {isCompany && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Статистика сотрудников
          </Typography>
          <Typography>
            Процент сотрудников в стрессе: {stressStats?.stressedPercent ?? 0}%
          </Typography>
          <Typography>
            Процент сотрудников без стресса: {stressStats?.noStressPercent ?? 0}%
          </Typography>
          {stressStats && (
            <PieChart width={300} height={250}>
              <Pie
                data={[
                  { name: 'В стрессе', value: stressStats.stressedPercent },
                  { name: 'Без стресса', value: stressStats.noStressPercent },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
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
          )}

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
                {employeesResults.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.result}</TableCell>
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
