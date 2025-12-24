const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false });
    }

    try {
      const user = await User.findById(data.id);
      if (!user) {
        return res.status(401).json({ status: false });
      }

      return res.status(200).json({
        status: true,
        authenticated: true,
        user: user.username,
      });
    } catch (error) {
      return res.status(500).json({ status: false });
    }
  });
};
