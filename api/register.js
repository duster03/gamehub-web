import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    await sql`
      insert into users (username, password_hash)
      values (${username}, ${hashed})
    `;

    res.status(201).json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}
