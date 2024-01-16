const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Job = require("./JobModel");
const cors = require("cors");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.use(cors());

router.get("/:jobId", async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({ error: "Job doesn't exist" });
    }

    let text = "";

    if (job.remoteOffice == "Remote") {
      text = "home";
    } else {
      text = "office";
    }

    res.status(200).json({
      text: text,
      jobDetails: job,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
