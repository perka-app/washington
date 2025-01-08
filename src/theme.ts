import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
  palette: {
    primary: {
      main: "#B66896",
      dark: "#8B3C68",
    },
    secondary: {
      main: "#1A2264",
      dark: "#130E44",
    },
  },
});
