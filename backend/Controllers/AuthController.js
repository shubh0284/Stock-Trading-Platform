const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const { createSecretToken } = require("../util/SecretToken");

// ---------------- SIGNUP ----------------
module.exports.Signup = async (req, res) => {
  try {
    console.log("REQ.BODY (Signup):", req.body);

    const { email, username, password } = req.body || {};

    if (!email || !username || !password) {
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

    /** * ⚠️ CHANGE MADE HERE:
     * We REMOVED 'const hashedPassword = await bcrypt.hash(password, 10);'
     * We pass the PLAIN password to User.create.
     * Your UserModel.js will handle the hashing automatically via the .pre("save") hook.
     */
    const user = await User.create({
      email,
      username,
      password, // Plain text here
    });

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: false, // Must be false for Localhost/Docker HTTP
    });

    res.status(201).json({
      success: true,
      message: "User signed up successfully",
      username: user.username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- LOGIN ----------------
module.exports.Login = async (req, res) => {
  try {
    console.log("REQ.BODY (Login):", req.body);

    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    /**
     * bcrypt.compare takes:
     * 1. The plain text password from the login form
     * 2. The hashed password stored in the database
     */
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      console.log("❌ Password mismatch for:", email);
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
