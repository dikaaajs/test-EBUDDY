"use client";

import { useState, useEffect } from "react";
import {
  Typography,
  Button,
  ThemeProvider,
  Box,
  Card,
  CardContent,
  TextField,
  Avatar,
  Grid,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { theme } from "@/theme/main";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebaseConfig";
import { fetchUser } from "@/api/auth";
import Loading from "@/components/atom/Loading";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState<any>({
    name: "",
    email: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user == null) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = await user.getIdToken();
        const data = await fetchUser(token, user.uid);
        setUserData(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = { name: "", email: "" };

    if (!formData.name.trim()) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSaving(true);

    try {
      // This is a placeholder for the actual update function
      // You would need to implement the actual API call to update the user profile
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      // Show success message
      setShowSuccess(true);

      // In a real implementation, you would update the user profile in your database
      // Example:
      // const token = await user.getIdToken()
      // await updateUserProfile(token, user.uid, formData)
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  if (loading || isLoading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          p: { xs: 2, md: 4 },
        }}
      >
        <Card elevation={3} sx={{ maxWidth: 800, mx: "auto" }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <IconButton
                onClick={() => router.push("/")}
                sx={{ mr: 2 }}
                aria-label="Back to dashboard"
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" fontWeight="bold">
                Edit Profile
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      bgcolor: theme.palette.primary.main,
                      fontSize: "3rem",
                    }}
                  >
                    {formData.name?.charAt(0).toUpperCase() || "U"}
                  </Avatar>
                  <Button variant="outlined" size="small">
                    Change Avatar
                  </Button>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!formErrors.name}
                      helperText={formErrors.name}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!formErrors.email}
                      helperText={formErrors.email}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
                <Button
                  variant="outlined"
                  onClick={() => router.push("/")}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={
                    isSaving ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SaveIcon />
                    )
                  }
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
