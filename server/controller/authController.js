const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { Fullname, Email, JobStatus, Password } = req.body;

    const user = await User.findOne({ Email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(Password, 10);

      const newUser = new User({
        Fullname,
        Email,
        JobStatus,
        Password: hashedPassword,
      });

      await newUser.save();

      res.status(200).json({ message: "User registration successful" });
    } else {
      res.status(403).json({ error: "Email already exists. Please use a different email or Login."});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });

    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (passwordMatch) {
      const token = jwt.sign({ email: user.Email }, "Your_Secret_Token", { expiresIn: '1h' });
      return res.status(200).json({ token, user });
    } else {
      return res.status(401).json({ error: "Password incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};