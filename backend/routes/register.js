import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required",
    });
  }

  // check if user exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.json({
          success: false,
          message: "Database error",
        });
      }

      if (results.length > 0) {
        return res.json({
          success: false,
          message: "User already exists",
        });
      }

      // hash password
      const hashedPassword = bcrypt.hashSync(password, 10);

      // insert user
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.json({
              success: false,
              message: "Registration failed",
            });
          }

          return res.json({
            success: true,
            message: "User registered successfully",
          });
        }
      );
    }
  );
});

export default router;
