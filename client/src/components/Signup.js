import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { signUpData } from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [isDateFocused, setDateFocused] = useState(false);
  const [signup, setsignup] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setsignup((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  //2103akash

  const handleFocus = () => {
    setDateFocused(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send the data to the backend
    signUpData(signup)
      .then((response) => {
        if (response.status === 200) {
          const { email, token } = response.data;
          if (token) {
            localStorage.setItem("accessToken", token);
            navigate("/login");
          }
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });

    console.log(
      `First Name : ${signup.firstName}, LastName : ${signup.lastName} `
    );

    setsignup({
      firstName: "",
      lastName: "",
      phone: "",
      dob: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
      <Box style={{ paddingLeft: 160 }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>
      <Box style={{ paddingLeft: 145 }}>
        <Typography variant="h5">Sign up</Typography>
      </Box>

      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="firstName"
              label="First Name"
              value={signup.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              name="lastName"
              label="Last Name"
              value={signup.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="phone"
              label="Phone Number"
              type="text"
              value={signup.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="dob"
              label="Date of Birth"
              type={isDateFocused ? "date" : "text"}
              value={signup.dob}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={() => setDateFocused(false)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={signup.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={signup.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={signup.confirmPassword}
              onChange={handleChange}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" underline="none">
                <Link to="/login">Already have an account? Log in</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Signup;
