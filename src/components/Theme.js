import { createTheme } from "@mui/material/styles";

// Define the light theme with custom link color
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Example primary color for light theme
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#1976d2", // Link color in light theme
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

// Define the dark theme with custom link color
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Example primary color for dark theme
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Explicitly set link color to white
        },
      },
    },
  },
});
