import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { sendAnalysisAnswers } from '../api/analysisService';
import { saveAssessment } from '../api/userService';

const questions = [
  'Опишите, как вы себя чувствуете в последнее время.',
  'Какие факторы вызывают у вас стресс?',
  'Как часто вы испытываете стресс на работе?',
  'Какие методы вы используете для снижения стресса?',
  'Есть ли у вас предложения по улучшению условий труда?',
];

const Analysis = () => {
  const [answers, setAnswers] = useState(questions.map(() => ''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (index) => (e) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.some((a) => a.trim() === '')) {
      setError('Пожалуйста, ответьте на все вопросы.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await sendAnalysisAnswers(answers);

      setResult(response);

      // Сохраняем результаты диагностики
      await saveAssessment({
        response_data: answers,
        stress_score: response.avg_score,
        details: answers.map((ans,index) => ({
          user_answer: ans,
          model_score: response.details[index], // если есть детализация от backend, можно сюда вставить
        })),
      });
    } catch (err) {
      setError('Ошибка при отправке данных. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Диагностика стресса
      </Typography>
      <Paper sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {questions.map((q, i) => (
              <div key={i}>
                <Typography variant="h6" gutterBottom>
                  {i + 1}. {q}
                </Typography>
                <TextField
                  multiline
                  minRows={3}
                  fullWidth
                  value={answers[i]}
                  onChange={handleChange(i)}
                  variant="outlined"
                  placeholder="Введите ваш ответ"
                  required
                />
              </div>
            ))}
            {error && <Alert severity="error">{error}</Alert>}
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Отправить'}
            </Button>
          </Stack>
        </form>
        {result && (
          <Paper sx={{ mt: 4, p: 3, backgroundColor: '#f0f5f1' }}>
            <Typography variant="h6" gutterBottom>
              Результат диагностики:
            </Typography>
            <Typography>Итоговый уровень стресса: {result.stress_label}</Typography>
            <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/profile')}>
              Вернуться в профиль
            </Button>
          </Paper>
        )}
      </Paper>
    </Container>
  );
};

export default Analysis;
