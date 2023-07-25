import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  CssBaseline,
} from "@mui/material";
import { editUserData } from "../api";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const navigate = useNavigate();
  const editDataString = localStorage.getItem("editData");
  const editData = JSON.parse(editDataString);
  console.log(editData);
  const [data, setData] = useState({
    name: "",
    phone: "",
    dob: "",
  });

  useEffect(() => {
    // Set initial state when the component mounts
    setData(editData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editData.name = data.name;
    editData.phone = data.phone;
    editData.dob = data.dob;

    editUserData(editData)
      .then((response) => {})
      .catch((error) => {});

    setData(editData);
    navigate("/users");

    console.log(editData);
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

      <Box style={{ paddingLeft: 150 }}>
        <Typography variant="h5">Edit Data</Typography>
      </Box>

      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              value={data.name}
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
              value={data.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="dob"
              label="Date of Birth"
              type="date"
              value={data.dob}
              onChange={handleChange}
            />
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditForm;
