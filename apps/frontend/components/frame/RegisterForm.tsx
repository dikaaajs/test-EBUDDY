"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import InputForm from "../atom/Input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import { registerUser } from "@/api/auth";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await registerUser(email, password, name);
      router.push("/auth/login");
      toast.success("Register Success");
    } catch (err: any) {
      toast.error(`${err}`);
    } finally {
      setLoading(false);
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
      <Typography variant="h5">Register</Typography>
      <InputForm
        label="Email"
        typeInput="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputForm
        label="Name"
        typeInput="text"
        onChange={(e) => setName(e.target.value)}
      />
      <InputForm
        label="Password"
        typeInput="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleRegister} loading={loading}>
        Register
      </Button>
      <Typography variant="caption">
        have account ?{" "}
        <Link href={"/auth/login"} className="text-blue-500">
          SignIn
        </Link>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
