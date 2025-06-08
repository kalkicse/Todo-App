const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Google Oauth
router.get("/google", passport.authenticate("google", { scope: ["profile","email"] }));
router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const payload = { id: req.user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

module.exports = router;
