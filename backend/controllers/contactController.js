import db from "../config/db.js";

export const sendMessage = (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }

    res.json({
      success: true,
      message: "Message saved successfully",
    });
  });
};
