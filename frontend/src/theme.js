import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5E35B1', // Deep Purple
      light: '#7E57C2',
      dark: '#4527A0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E57373', // Warm Rose
      light: '#EF9A9A',
      dark: '#C62828',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#4DB6AC', // Soft Teal
      light: '#80CBC4',
      dark: '#00897B',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#212121', // Rich Black
      secondary: '#616161', // Dark Gray
      disabled: '#9E9E9E', // Medium Gray
    },
    background: {
      default: '#FFFFFF', // Pure White
      paper: '#F5F5F5', // Off-White
    },
    divider: '#E0E0E0', // Light Gray
    success: {
      main: '#66BB6A', // Success Green
    },
    warning: {
      main: '#FFA726', // Alert Orange
    },
    error: {
      main: '#E53935', // Error Red
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '28px',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '24px',
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '20px',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '18px',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '16px',
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '16px',
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 400,
      fontSize: '14px',
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      fontSize: '11px',
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '14px',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '12px 24px',
          minHeight: 48,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
          padding: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderWidth: '1.5px',
            },
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 56,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 8,
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
