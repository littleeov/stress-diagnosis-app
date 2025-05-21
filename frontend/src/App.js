import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';

// Импорт страниц (создадим позже)
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import Analysis from './pages/Analysis/Analysis';

function App() {
  return (
    <>
      <CssBaseline /> {/* Сброс стилей MUI */}
      <Router>
        <Container maxWidth="md" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;

