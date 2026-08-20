import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#3B82F6",
    },

    secondary: {
      main: "#00BCD4",
    },

    background: {
      default: "#0F172A",
      paper: "#1E293B",
    },

    success: {
      main: "#00E676",
    },

    warning: {
      main: "#FFC107",
    },

    error: {
      main: "#FF5252",
    },
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },
});

export default theme;