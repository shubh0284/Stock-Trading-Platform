const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

module.exports.userVerification = async (req, res) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ status: false, message: "No token found" });
    }

    // 2️⃣ Verify token (throws error if invalid)
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    // 3️⃣ Find user by ID from token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    // 4️⃣ Respond with user info
    return res.status(200).json({
      status: true,
      authenticated: true,
      user: user.username,
    });
  } catch (err) {
    console.error("User verification error:", err);

    // Token expired or invalid
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ status: false, message: "Invalid token" });
    }

    // Other server errors
    return res.status(500).json({ status: false, message: "Server error" });
  }
};
