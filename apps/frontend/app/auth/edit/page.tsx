"use client";

import EditForm from "@/components/frame/EditForm";
import { theme } from "@/theme/main";
import { ThemeProvider } from "@mui/material";

export default function Edit() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-center items-center h-screen">
        <EditForm />
      </div>
    </ThemeProvider>
  );
}
