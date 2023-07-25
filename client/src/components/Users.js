import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import EditIcon from "@mui/icons-material/Edit";
import { getUsersData, removeUserData } from "../api";
import EditForm from "./EditForm";
import { useNavigate } from "react-router-dom";

const Users = ({ token }) => {
  const [userData, setuserData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getUsersData()
      .then((response) => {
        setuserData(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(userData);

  const handleDelete = (deleteData) => {
    removeUserData(deleteData)
      .then((response) => {
        console.log(response.data);
        getUsersData()
          .then((response) => {
            setuserData(response.data.result);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (editData) => {
    console.log(editData);
    const editDataJSON = JSON.stringify(editData);

    // Store the JSON string in Local Storage
    localStorage.setItem("editData", editDataJSON);

    // Navigate to the "/edit" page
    navigate("/edit");
  };

  return (
    <Box>
      <Typography
        variant="h3"
        style={{ padding: "20px" }}
        display="flex"
        justifyContent={"center"}
        marginBottom="10px"
      >
        {" "}
        User Data :-{" "}
      </Typography>
      <Box>
        {userData.map((user) => (
          <Box
            bgcolor="#36454F"
            padding="20px"
            borderRadius={5}
            display="flex"
            alignItems="center"
            paddingTop="20px"
            marginBottom="10px"
          >
            <Box>
              <Typography color="white" fontWeight="bold" paddingBottom="10px">
                {user.name}
              </Typography>
              <Typography color="white" fontWeight="bold" paddingBottom="10px">
                {user.phone}
              </Typography>
              <Typography color="white" fontWeight="bold" paddingBottom="10px">
                {user.dob}
              </Typography>
            </Box>

            <Box marginLeft="auto">
              <DeleteSharpIcon
                style={{ color: "white", paddingRight: "20px" }}
                onClick={() => handleDelete(user)}
              />
              <EditIcon
                style={{ color: "white" }}
                onClick={() => handleEdit(user)}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Users;
