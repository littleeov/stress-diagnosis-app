import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import theme from './theme';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Analysis from './pages/Analysis';
// импортируйте другие страницы по мере необходимости

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
