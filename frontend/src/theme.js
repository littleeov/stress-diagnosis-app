// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(141,221,128)', // мягкий зелёный
      light: 'rgb(146,229,133) ', // светлее
      dark: 'rgb(119,187,108)', // темнее
    },
    secondary: {
      main: 'rgb(97,153,89)', // акцентный бирюзовый
      light: 'rgb(119,187,108)' ,
      dark: 'rgb(76,119,69)',
    },
    background: {
      default: '#f8fff5', // мягкий фон
      paper: '#ffffff',
    },
    text: {
      primary: '#333',
      secondary: '#555',
    },
    success: {
      main: 'rgb(169, 199, 22)', // близкий дополнительный зелёный
    }
  },
  typography: {
    fontFamily: `'Poppins', sans-serif`,
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export default theme;
