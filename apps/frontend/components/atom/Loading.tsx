import { theme } from "@/theme/main";
import { ThemeProvider, Typography } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen flex justify-center items-center">
        <Typography variant="caption">loading ...</Typography>
      </div>
    </ThemeProvider>
  );
}
