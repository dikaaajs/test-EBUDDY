"use client";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/main";
import LoginForm from "@/components/frame/LoginForm";

export default function LoginPage() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </ThemeProvider>
  );
}
