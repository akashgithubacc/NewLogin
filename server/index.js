import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import mysql2 from "mysql2";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
dotenv.config();

export const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "#@+-99**a",
  database: "auth_data",
});

const PORT = process.env.PORT || 5000;

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});
