const express = require("express");
const router = express.Router();
const Job = require("./JobModel");
const cors = require("cors");
const jwt = require("jsonwebtoken");

router.use(cors());

router.use(express.json());

const isLoggedIn = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRETKEY);
      console.log("hi");
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

router.patch("/:jobId", isLoggedIn, async (req, res, next) => {
  try {
    const { jobId } = req.params;
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

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({ message: "Job not found" });
    }

    const skillsArray = skillsRequired.split(",").map((skill) => skill.trim());

    job.companyName = companyName;
    job.logoURL = logoURL;
    job.jobPosition = jobPosition;
    job.monthlySalary = monthlySalary;
    job.jobType = jobType;
    job.remoteOffice = remoteOffice;
    job.location = location;
    job.jobDescription = jobDescription;
    job.aboutCompany = aboutCompany;
    job.skillsRequired = skillsArray;
    job.additionalInformation = additionalInformation;

    await job.save();

    res.status(200).json({
      message: "Job updated successfully",
      newJobDetails: job,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
