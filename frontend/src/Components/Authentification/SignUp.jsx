import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postSignup } from "./AuthSaga";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, signedUp } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSignup(form));
  };

  useEffect(() => {
    if (signedUp) {
      navigate("/");
    }
  }, [navigate, signedUp]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      marginTop="-2rem"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: "#2393b7", fontWeight: "bold" }}
        >
          Create new account
        </Typography>

        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          value={form.username}
          onChange={handleChange}
          InputProps={{
            startAdornment: <LoginIcon sx={{ mr: 1 }} />,
          }}
        />
        <TextField
          label="email"
          name="email"
          fullWidth
          margin="normal"
          value={form.email}
          onChange={handleChange}
          InputProps={{
            startAdornment: <LoginIcon sx={{ mr: 1 }} />,
          }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={form.password}
          onChange={handleChange}
          InputProps={{
            startAdornment: <LoginIcon sx={{ mr: 1 }} />,
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: "#2393b7",
            "&:hover": { backgroundColor: "rgb(181, 229, 246)" },
            mt: 2,
          }}
        >
          Signup
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          fullWidth
          variant="text"
          sx={{ borderColor: "#2393b7", color: "#2393b7" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Back to Login
        </Button>
      </Box>
    </Box>
  );
};

export default SignUp;
