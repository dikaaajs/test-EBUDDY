"use client";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme/main";
import RegisterForm from "@/components/frame/RegisterForm";

export default function RegisterPage() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-center items-center h-screen">
        <RegisterForm />
      </div>
    </ThemeProvider>
  );
}
