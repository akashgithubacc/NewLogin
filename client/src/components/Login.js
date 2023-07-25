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
import { logInData } from "../api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setlogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Send the data to the backend
    logInData(login)
      .then((response) => {
        if (response.status === 200) {
          const { email, token } = response.data;
          if (token) {
            localStorage.setItem("accessToken", token);
            navigate("/users");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setlogin({
      email: "",
      password: "",
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
      <Box style={{ paddingLeft: 150 }}>
        <Typography variant="h5">Log in</Typography>
      </Box>

      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              value={login.email}
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
              value={login.password}
              onChange={handleChange}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" underline="none">
                <Link to="/">Don't have an account ? Sign up</Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
