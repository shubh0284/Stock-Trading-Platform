const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

// ---------------- SIGNUP ----------------
module.exports.Signup = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body); // 🔍 Debug: check incoming data

    // Safe destructure with default
    const { email, username, password } = req.body || {};

    if (!email || !username || !password) {
      console.log("Missing fields:", { email, username, password }); // 🔍 Debug
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = createSecretToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: false, // set true if HTTPS
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      username: user.username,
    });
  } catch (err) {
    console.error("Signup error:", err); // Full error log
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
module.exports.Login = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body); // 🔍 Debug

    const { email, password } = req.body || {};

    if (!email || !password) {
      console.log("Missing login fields:", { email, password }); // 🔍 Debug
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const auth = await bcrypt.compare(password, user.password);
    if (!auth)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err); // Full error log
    res.status(500).json({ success: false, message: "Server error" });
  }
};
