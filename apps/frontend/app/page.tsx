"use client";

import { theme } from "@/theme/main";
import { Button, ThemeProvider } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-primary">
        <div className="flex items-center justify-center h-screen">
          <Button
            variant="contained"
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
