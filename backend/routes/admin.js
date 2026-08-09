import express from "express";
import db from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all messages — protected
router.get("/messages", auth, (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY created_at DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    res.json({
      success: true,
      messages: results,
    });
  });
});

export default router;
