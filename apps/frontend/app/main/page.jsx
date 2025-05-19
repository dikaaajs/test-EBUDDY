"use client";

import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { fetchUser } from "@/api/auth";
import Loading from "@/components/atom/Loading";

export default function Main() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user == null) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await user.getIdToken();
        const data = await fetchUser(token, user.uid);
        setUserData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  console.log(userData);

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen flex flex-col justify-center items-center">
        <Typography variant="h2">
          Hi, Welcome back {userData.name} 👋
        </Typography>
        <Button
          variant="contained"
          className="text-white bg-black/50"
          loading={loading}
        >
          Edit
        </Button>
      </div>
    </ThemeProvider>
  );
}
