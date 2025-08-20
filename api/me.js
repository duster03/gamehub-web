import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await sql`SELECT username FROM users WHERE id = ${decoded.userId}`;

    if (result.length === 0) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ username: result[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
