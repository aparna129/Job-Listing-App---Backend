const express = require("express");
const User = require("./UserModel");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

router.use(express.json());

router.use(cors());

router.post("/", async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || mobile.length != 10 || !password) {
      return res.status(400).json({ error: "Please enter valid details" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const allUsers = await User.find();

    const existingEmails = allUsers.filter((user) => user.email === email);

    if (existingEmails.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const jwttoken = jwt.sign({ email }, process.env.JWT_SECRETKEY, {
      expiresIn: "24h",
    });

    const user = await User.create({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });

    res.status(200).json({
      message: "User created successfully",
      data: user,
      recruiterName: name,
      jwttoken: jwttoken,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
