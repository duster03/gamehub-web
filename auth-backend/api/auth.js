import { Pool } from "pg";
import bcrypt from "bcryptjs";

// Create a connection pool (read DATABASE_URL from env vars)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { action, username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (action === "signup") {
    // 1. Hash the password before saving
    const hash = await bcrypt.hash(password, 10);
    try {
      await pool.query(
        "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
        [username, hash]
      );
      return res.status(200).json({ success: true, message: "User registered" });
    } catch (err) {
      return res.status(400).json({ error: "Username already exists" });
    }
  }

  if (action === "login") {
    // 1. Get stored hash for this username
    const result = await pool.query(
      "SELECT password_hash FROM users WHERE username=$1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // 2. Compare given password with stored hash
    const valid = await bcrypt.compare(password, result.rows[0].password_hash);

    if (!valid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    return res.json({ success: true, message: "Login successful" });
  }

  res.status(400).json({ error: "Invalid action" });
}
