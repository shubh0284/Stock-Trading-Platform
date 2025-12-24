const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

module.exports.Signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ email, username, password });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      withCredentials: true,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    console.log(err);
  }
};
