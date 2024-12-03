const express = require("express");
const db = require("../models/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(rows);
  });
});

router.get("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err || !row) return res.status(404).json({ message: "Product not found" });
    res.json(row);
  });
});

module.exports = router;
