const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const registerRoute = require("./register");
const loginRoute = require("./login");
const addJobRoute = require("./jobCreation");
const editJobRoute = require("./editJob");
const filterJobsRoute = require("./filterJobs");
const detailDescOfjobRoute = require("./detailDescOfJob");

const app = express();

app.use(cors());

app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/addjob", addJobRoute);
app.use("/editjob", editJobRoute);
app.use("/filterjobs", filterJobsRoute);
app.use("/detaildesc", detailDescOfjobRoute);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json({message:"Backend Capstone Project"});
});

// Health API

app.get("/health", (req, res) => {
  res.status(200).json({message:"Server is running successfully"});
});

// Route not found Middleware

app.use((req, res, next) => {
  res.status(200).json({ error: "Route not found" });
});

// Error handler Middleware

app.use((error, req, res, next) => {
  console.log(error);
  res.status(400).json("Something went wrong! Please try after some time.");
});

app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Database and server connected successfully"))
    .catch((error) => console.log(error));
});
