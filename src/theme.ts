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
      main: "#3949ab",
    },
    secondary: {
      main: "#ab47bc",
    },
  },
});
