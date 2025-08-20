import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const sql = neon(process.env.DATABASE_URL)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" })
  }

  try {
    const users = await sql`
      SELECT * FROM users WHERE username = ${username}
    `

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const user = users[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user.id }, // payload
      process.env.JWT_SECRET, // secret key
      { expiresIn: "1h" } // expiry
    )

    return res.status(200).json({
      message: "Login successful",
      token
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: "Database error" })
  }
}
