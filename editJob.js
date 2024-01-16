const express = require("express");
const router = express.Router();
const Job = require("./JobModel");
const cors = require("cors");

router.use(cors());

router.use(express.json());

router.patch("/:jobId", async (req, res, next) => {
  
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
