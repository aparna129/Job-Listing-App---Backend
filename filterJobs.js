const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("./JobModel");
const cors = require("cors");

router.use(cors());

router.use(express.json());

router.post("/", async (req, res, next) => {
  try {
    const { skills, jobPosition } = req.body;
    let filters = {};

    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      filters.skillsRequired = { $in: skillsArray };
    }

    if (jobPosition) {
      filters.jobPosition = { $regex: jobPosition, $options: "i" };
    }


    const jobs = await Job.find(filters);

    if (jobs.length === 0) {
      return res.status(400).json({ error: "No jobs present" });
    } 

    res.status(200).json({
      message: "Jobs fetched successfully",
      jobs: jobs,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
