"use client";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputForm from "../atom/Input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { editUser, fetchUser } from "@/api/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import Loading from "../atom/Loading";

const EditForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();
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

  const handleEdit = async (e: any) => {
    e.preventDefault();

    try {
      const token = await user!.getIdToken();
      await editUser({ name }, user!.uid, token);
      router.push("/main");
      toast.success("Edit Success");
    } catch (err: any) {
      toast.error(`${err}`);
      console.log(err);
    }
  };

  if (loading || isLoading) {
    return <Loading />;
  }

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
        defaultValue={userData?.name}
        label="Name"
        typeInput="text"
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={handleEdit} loading={loading}>
        Edit
      </Button>
    </Box>
  );
};

export default EditForm;
