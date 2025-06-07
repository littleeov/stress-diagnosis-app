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
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import {
  fetchUserProfile,
  updateUserProfile,
  fetchLastAssessment,
  fetchCompanyStats,
} from '../api/userService';

const COLORS = ['#00B454', '#FF3900'];

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [lastAssessment, setLastAssessment] = useState(null);
  const [companyStats, setCompanyStats] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [isCompany, setIsCompany] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userProfile = await fetchUserProfile();
        setIsCompany(userProfile.is_company);

        if (userProfile.is_company) {
          const companyName = userProfile.company_name || userProfile.username || '';

          setProfileData(userProfile);
          setFormData({
            companyName,
            username: userProfile.username || '',
          });

          const stats = await fetchCompanyStats();
          setCompanyStats(stats);
        } else {
          const fullName = [userProfile.surname, userProfile.name, userProfile.patronymic]
            .filter(Boolean)
            .join(' ');
          const company = userProfile.employee || '';

          setProfileData(userProfile);
          setFormData({
            fullName,
            company,
            surname: userProfile.surname || '',
            name: userProfile.name || '',
            patronymic: userProfile.patronymic || '',
            username: userProfile.username || '',
            employee: userProfile.employee || '',
          });

          const last = await fetchLastAssessment();
          setLastAssessment(last);

          setCompanyStats({
            employees_results: last
              ? [{
                  id: userProfile.id,
                  name: fullName,
                  stress_score: last.stress_score,
                  created_at: last.created_at,
                }]
              : [],
          });
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
      if (isCompany) {
        const dataToSave = {
          company_name: formData.companyName,
          username: formData.username,
        };
        await updateUserProfile(dataToSave);
        setProfileData((prev) => ({ ...prev, ...dataToSave }));
      } else {
        const dataToSave = {
          surname: formData.surname,
          name: formData.name,
          patronymic: formData.patronymic,
          username: formData.username,
          employee: formData.employee,
        };
        await updateUserProfile(dataToSave);
        setProfileData((prev) => ({ ...prev, ...dataToSave }));
        const fullName = [dataToSave.surname, dataToSave.name, dataToSave.patronymic]
          .filter(Boolean)
          .join(' ');
        setFormData((prev) => ({
          ...prev,
          fullName,
          company: dataToSave.employee,
        }));
      }
      setEditMode(false);
    } catch (error) {
      console.error('Ошибка сохранения профиля', error);
    }
  };

  // Данные для линейного графика компании: stress_history с числами
  const lineChartData = companyStats?.stress_history
    ?.map((item) => ({
      date: dayjs(item.date).format('DD.MM.YYYY'),
      stressedPercent: Number(item.stressed_percent),
    }))
    .filter(item => !isNaN(item.stressedPercent))
    .sort((a, b) => dayjs(a.date, 'DD.MM.YYYY').unix() - dayjs(b.date, 'DD.MM.YYYY').unix()) || [];

  // Данные для круговой диаграммы компании
  const pieData = companyStats
    ? [
        { name: 'В стрессе', value: Number(companyStats.stressed_percent) },
        { name: 'Без стресса', value: Number(companyStats.no_stress_percent) },
      ]
    : [];

  // Для таблицы и графика истории результатов пользователя и компании
  const chartData = companyStats?.employees_results
    ?.map((item) => ({
      date: dayjs(item.created_at).format('DD.MM.YYYY'),
      stress: Number(item.stress_score),
    }))
    .filter(item => !isNaN(item.stress))
    .sort((a, b) => dayjs(a.date, 'DD.MM.YYYY').unix() - dayjs(b.date, 'DD.MM.YYYY').unix()) || [];

  if (loading)
    return <CircularProgress sx={{ mt: 4, display: 'block', mx: 'auto' }} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Профиль {isCompany ? 'компании' : 'пользователя'}
      </Typography>

      {/* Форма редактирования */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Stack spacing={2} direction="row" alignItems="center" flexWrap="wrap">
          {editMode ? (
            isCompany ? (
              <>
                <TextField
                  label="Название компании"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
                />
                <TextField
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
                />
                <Button variant="contained" onClick={handleSave}>
                  Сохранить
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Отмена
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Фамилия"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  label="Имя"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  label="Отчество"
                  name="patronymic"
                  value={formData.patronymic}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 200 }}
                />
                <TextField
                  label="Компания"
                  name="employee"
                  value={formData.employee}
                  onChange={handleChange}
                  fullWidth
                  sx={{ minWidth: 300 }}
                />
                <Button variant="contained" onClick={handleSave}>
                  Сохранить
                </Button>
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Отмена
                </Button>
              </>
            )
          ) : (
            isCompany ? (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{formData.companyName}</Typography>
                  <Typography color="text.secondary">Username: {formData.username}</Typography>
                </Box>
                <Button variant="outlined" onClick={() => setEditMode(true)}>
                  Редактировать
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
            )
          )}
        </Stack>
      </Paper>

      {/* Для обычного пользователя: последний результат диагностики */}
      {!isCompany && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Последний результат диагностики стресса
          </Typography>
          {lastAssessment ? (
            <Typography sx={{ mb: 2 }}>
              Результат: {(lastAssessment.stress_score).toFixed(1)}%
            </Typography>
          ) : (
            <Typography>Нет данных</Typography>
          )}
        </Paper>
      )}

      {/* Для компании: круговая диаграмма и линейный график динамики */}
      {isCompany && companyStats && (
        <>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Процентное соотношение сотрудников
            </Typography>
            <PieChart width={300} height={250}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.name}: ${entry.value.toFixed(1)}%`}
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Legend />
            </PieChart>
          </Paper>
        </>
      )}

      {/* Таблица с последними результатами сотрудников (компания) или историей результатов (пользователь) */}
      {companyStats?.employees_results && companyStats.employees_results.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {isCompany ? 'Последние результаты сотрудников' : 'История результатов'}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Имя</TableCell>
                  <TableCell>Результат (%)</TableCell>
                  {!isCompany && <TableCell>Дата</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {companyStats.employees_results.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{(emp.stress_score).toFixed(1)}</TableCell>
                    {!isCompany && (
                      <TableCell>{emp.created_at ? dayjs(emp.created_at).format('DD.MM.YYYY') : '-'}</TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}

      {/* Для пользователя: линейный график истории результатов */}
      {!isCompany && companyStats && companyStats.employees_results && companyStats.employees_results.length > 0 && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            История результатов диагностики
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <Line
                type="monotone"
                dataKey="stress"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </Container>
  );
};

export default Profile;

