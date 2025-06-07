// src/theme.js
import { createTheme } from '@mui/material/styles';
import { red, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00B454',
      dark: '#007536',
      light: '#36DA82',
    },
    secondary: {
      main: '#FF3900',
      dark: '#A62500',
      light: '#FF6B40',
    },
  },
  typography: {
    fontFamily: '"Titillium Web", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    // остальные стили по необходимости
  },
});

export default theme;
