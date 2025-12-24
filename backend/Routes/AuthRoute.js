const router = require("express").Router();
const { Signup, Login } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);

// ✅ THIS FIXES THE REDIRECT LOOP
router.get("/verify", userVerification);

router.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  return res.status(200).json({ success: true });
});

module.exports = router;
