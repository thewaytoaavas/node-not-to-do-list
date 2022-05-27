// import dotenv from "dotenv";
// dotenv.config();

import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.Port || 8000;

import { connectMongoDB } from "./src/config/dbConfig.js";
connectMongoDB();
// console.log(process.env); //.DB_Connection

app.use(express.json());
app.use(cors());
// Task api endpoints
import taskRouter from "./src/routers/taskRouter.js";
app.use("/api/v1/tasks", taskRouter);

import path from "path";
const __dirname = path.resolve();

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(PORT, (error) => {
  error && console.log(error);

  console.log(`Server is running on http://localhost:${PORT}`);
});
