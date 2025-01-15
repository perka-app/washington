import { createTheme } from '@mui/material'

export const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          height: '50px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
    h4: {
      letterSpacing: '0.3em',
      fontWeight: 700,
    },
    h6: {
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: '#B66896',
      dark: '#8B3C68',
    },
    secondary: {
      main: '#1A2264',
      dark: '#130E44',
    },
  },
})
