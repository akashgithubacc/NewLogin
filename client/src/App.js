import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Users from "./components/Users";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";
import EditForm from "./components/EditForm";

const App = () => {
  const token = localStorage.getItem("accessToken");

  console.log(token);

  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {token && <Route path="/users" element={<Users token={token} />} />}
          <Route path="/edit" element={<EditForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
