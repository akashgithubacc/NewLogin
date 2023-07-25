import axios from "axios";

const url = "http://localhost:5000";

export const signUpData = (signup) => {
  return axios.post(`${url}/signup`, { signup });
};

export const logInData = (login) => {
  return axios.post(`${url}/login`, { login });
};

export const getUsersData = () => {
  return axios.post(`${url}/users`);
};

export const removeUserData = (deleteData) => {
  return axios.post(`${url}/deleting`, { deleteData });
};

export const editUserData = (editData) => {
  return axios.patch(`${url}/edit`, { editData });
};
