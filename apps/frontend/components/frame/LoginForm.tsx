"use client";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import InputForm from "../atom/Input";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, SetLoading] = useState(false);

  const handleLogin = async () => {
    SetLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      SetLoading(false);
      router.push("/main");
    } catch (error) {
      SetLoading(false);
      toast.error("Login Error");
      console.log("Login Error:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: { xs: "90%", md: "50%", lg: "30%" },
        mx: "auto",
        p: 5,
        borderRadius: "9px",
        bgcolor: "primary.200",
      }}
    >
      <Typography variant="h5">Login</Typography>
      <InputForm
        label="Email"
        typeInput="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputForm
        label="Password"
        typeInput="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin} loading={loading}>
        Login
      </Button>
      <Typography variant="caption">
        new user ?{" "}
        <Link href={"/auth/register"} className="text-blue-500">
          SignUp
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
