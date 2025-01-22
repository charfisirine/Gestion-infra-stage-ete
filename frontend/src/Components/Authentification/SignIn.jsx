import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useDispatch, useSelector } from "react-redux";
import { postSignin } from "./AuthSaga";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, signedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postSignin(form));
  };

	useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (signedIn) {
      navigate("/dashboard");
    }
  }, [navigate, signedIn]);

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
          Log in to your account
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
        <Link
          href="#"
          variant="body2"
          sx={{ display: "block", textAlign: "right", mt: 1, mb: 2 }}
        >
          Forgot your password?
        </Link>
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
          Login
        </Button>

        <Divider sx={{ my: 3 }}>OR</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<HowToRegIcon />}
          sx={{ borderColor: "#2393b7", color: "#2393b7" }}
					onClick={()=> {
            navigate("/signUp")
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
