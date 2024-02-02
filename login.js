const express = require("express");
const router = express.Router();
const User = require("./UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use(express.json());

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (passwordMatched) {
      jwttoken = jwt.sign({ email }, process.env.JWT_SECRETKEY, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "Logged in successfully",
        yourjwttoken: jwttoken,
        recruiterName: user.name,
      });
    } else {
      return res.status(400).json({ error: "Incorrect Password" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
