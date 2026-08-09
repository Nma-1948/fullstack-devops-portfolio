import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required",
    });
  }

  // find user
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        return res.json({
          success: false,
          message: "Database error",
        });
      }

      // user not found
      if (results.length === 0) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      const user = results[0];

      // compare password
      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // success
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }
  );
});

export default router;
