import { createTheme, outlinedInputClasses } from "@mui/material";

export const theme = createTheme({
  typography: {
    h2: {
      fontSize: "2.5rem",
      fontWeight: 500,
      color: "#fff",
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
      color: "#fff",
    },
    caption: {
      fontSize: "0.75rem",
      color: "#7A7A7A",
    },
  },
  palette: {
    primary: {
      main: "#0D0D0D",
      "200": "#161616",
      light: "#7A7A7A",
      contrastText: "#fffff",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#6F7E8C",
          "& label.Mui-focused": {
            color: "var(--TextField-brandBorderFocusedColor)",
          },
          label: { color: "#fff" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: { color: "#fff" },
        notchedOutline: {
          borderColor: "var(--TextField-brandBorderColor)",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)",
          },
        },
      },
    },
  },
});
