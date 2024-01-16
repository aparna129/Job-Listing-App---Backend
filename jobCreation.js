const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("./JobModel");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(express.json());

router.use(cors());

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRETKEY);
      if (user) {
        next();
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Token expired or invalid. Please login again." });
  }
};

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const {
      companyName,
      logoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      additionalInformation,
    } = req.body;

    if (
      !companyName ||
      !logoURL ||
      !jobPosition ||
      !monthlySalary ||
      !jobType ||
      !remoteOffice ||
      !location ||
      !jobDescription ||
      !aboutCompany ||
      !skillsRequired ||
      !additionalInformation
    ) {
      return res.status(400).json({ error: "Please enter all details" });
    }

    const skillsArray = skillsRequired.split(",").map((skill) => skill.trim());

    const job = await Job.create({
      companyName,
      logoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOffice,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired: skillsArray,
      additionalInformation,
    });

    res.status(200).json({
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
