/* eslint-disable immutable/no-mutation */
import { createTheme } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    navigation: true // Add your custom variant
  }
}

export const theme = createTheme({
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
      light: '#D18DB9',
      dark: '#8B3C68',
    },
    secondary: {
      main: '#1A2264',
      light: '#2D3A87',
      dark: '#130E44',
    },
  },
})

theme.components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '30px',
        height: '50px',
        margin: '0 1rem',
        padding: '0 1.5rem',
      },
      sizeSmall: {
        borderRadius: '20px',
        height: '26px',
        fontSize: '0.75rem',
        padding: '4px 16px',
        minWidth: 'unset', // Allow it to be as small as needed
        textTransform: 'none', // Optional: Disable uppercase text
      },
    },
    variants: [
      {
        props: { variant: 'navigation' },
        style: {
          //test
        },
      },
    ],
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '30px',
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: theme.palette.primary.main,
        '&:hover': {
          color: theme.palette.primary.light,
          backgroundColor: 'transparent', // Remove hover background
        },
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      ':root': {
        '--primary-color': theme.palette.primary.main,
        '--primary-color-dark': theme.palette.primary.dark,
        '--primary-color-light': theme.palette.primary.light,
        '--secondary-color': theme.palette.secondary.main,
        '--secondary-color-dark': theme.palette.secondary.dark,
        '--secondary-color-light': theme.palette.secondary.light,
        '--black': '#400031',
        '--white': '#fff',
        '--error-color': 'red',
      },
    },
  },
}
