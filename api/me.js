import jwt from "jsonwebtoken";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Neon DB connection
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query("SELECT username FROM users WHERE id = $1", [decoded.userId]);

    if (result.rows.length === 0) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ username: result.rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
