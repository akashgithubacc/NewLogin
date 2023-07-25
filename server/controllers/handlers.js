import express from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { db } from "../index.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const createToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET, { expiresIn: "3d" });
};

export const signUpHandlers = async (req, res) => {
  //2103Akash#

  const { signup } = req.body;
  const { firstName, lastName, phone, dob, email, password, confirmPassword } =
    signup;

  if (!validator.isMobilePhone(phone, "any", { strictMode: false })) {
    res.status(404).send("Enter a valid mobile Number");
  }
  if (!validator.isStrongPassword(password)) {
    res.status(404).send("Password must be Strong");
  }
  if (confirmPassword !== password) {
    res.status(404).send("Confirm Password and Password Should Match");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const name = firstName + " " + lastName;

  const sqlInsert = `INSERT INTO registrationdata (name, phone, dob, password, email) VALUES ("${name}", "${phone}", "${dob}", "${hash}", "${email}" )`;
  db.query(sqlInsert, (err, result) => {
    if (err) {
      //console.log(`error : ${err}`);
      res.status(500).send("Error Entering the user data");
    } else {
      //console.log(`result : ${result.id} email : ${result.email}`);
      const token = createToken(result.id, result.email);

      res.status(200).json({ email, token });
    }
  });
};

export const logInHandlers = async (req, res) => {
  const { login } = req.body;

  const { email, password } = login;

  const sqlFind = `SELECT * FROM registrationdata WHERE email = "${email}"`;

  db.query(sqlFind, async (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving user data");
    } else {
      if (result.length === 0) {
        res.status(404).send("User cannot be found");
      } else {
        const hashedPassword = result[0].password;

        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
          res.status(404).send("Wrong Password");
        }

        //console.log(`id : ${result[0].id} email: ${result[0].email}`);
        const token = createToken(result[0].id, result[0].email);
        res.status(200).json({ email, token });
      }
    }
  });
};

export const userDataHandlers = async (req, res) => {
  const sqlFetch = `SELECT * FROM registrationdata`;
  db.query(sqlFetch, async (err, result) => {
    if (err) {
      //console.log(`error on 85 Line : ${err}`);
      res.status(500).send("Error Retrieving Data");
    } else {
      res.status(200).json({ result });
    }
  });
};

export const removeUserHandler = async (req, res) => {
  const { deleteData } = req.body;
  //console.log(deleteData);
  const userEmail = deleteData.email;

  const sqlDelete = `DELETE FROM registrationdata WHERE email = '${userEmail}'`;
  db.query(sqlDelete, async (err, result) => {
    if (err) {
      //console.log(`error on 101 Line on delete : ${err}`);
      res.status(500).send("Error Deleting Data");
    } else {
      const sqlFetch = `SELECT * FROM registrationdata`;
      db.query(sqlFetch, async (err, fetchResult) => {
        if (err) {
          //console.log(`error on 85 Line : ${err}`);
          res.status(500).send("Error Retrieving Data");
        } else {
          res.status(200).json({ fetchResult });
        }
      });
    }
  });
};

export const editUserHandler = async (req, res) => {
  const { editData } = req.body;
  console.log(editData);

  const { id, name, phone, dob, email, password } = editData;

  const sqlUpdate = `UPDATE registrationdata 
                  SET name = "${name}",
                      phone = "${phone}",
                      dob = "${dob}",
                      email = "${email}"
                  WHERE id = "${id}"`;

  db.query(sqlUpdate, (err, result) => {
    if (err) {
      res.status(500).send("Error updating the data");
    } else {
      const sqlFetch = `SELECT * FROM registrationdata`;
      db.query(sqlFetch, async (err, editResult) => {
        if (err) {
          //console.log(`error on 85 Line : ${err}`);
          res.status(500).send("Error Retrieving Data");
        } else {
          res.status(200).json({ editResult });
        }
      });
    }
  });
};

export default router;

//2103Akash#
