const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../models/db");
dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, user) => {
      if (err || !user) return res.status(401).json({ message: "Invalid credentials" });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({ token });
      });
    }
  );
});

module.exports = router;
