const mongoose = require("mongoose");

const Job = mongoose.model("job", {
  companyName: {
    type: String,
    required: true,
  },
  logoURL: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Intern"],
    required: true,
  },
  remoteOffice: { type: String, enum: ["Remote", "Office"], required: true },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  skillsRequired: {
    type: Array,
    required: true,
  },
  additionalInformation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = Job;
