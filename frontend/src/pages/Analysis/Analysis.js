// src/pages/Analysis/Analysis.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { analyzeText } from '../../services/analysisService';

const Analysis = () => {
  const [text, setText] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const data = await analyzeText({ text });
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при анализе текста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Анализ текста
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Введите текст для анализа"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Анализировать'}
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {results && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Результаты анализа:</Typography>
            <Typography>
              Степень стресса: {results.stressLevel}
            </Typography>
            {/* Другие результаты */}
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Analysis;
