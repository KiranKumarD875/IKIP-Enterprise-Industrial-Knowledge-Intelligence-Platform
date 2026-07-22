import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import pool from "./db";
import { RowDataPacket } from "mysql2";

const SESSION_COOKIE = "ikip_session";
const SESSION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: number): Promise<string> {
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DAYS);

  await pool.execute(
    "INSERT INTO sessions (user_id, token, expires_at) VALUES (?, ?, ?)",
    [userId, token, expiresAt]
  );

  return token;
}

export async function validateSession(
  token: string
): Promise<{ id: number; name: string; email: string; role: string; company: string } | null> {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT u.id, u.name, u.email, u.role, u.company 
     FROM sessions s 
     JOIN users u ON s.user_id = u.id 
     WHERE s.token = ? AND s.expires_at > NOW()`,
    [token]
  );

  if (rows.length === 0) return null;

  // Extend the session in the DB by 7 days on every valid validation (Rolling Session)
  await pool.execute(
    "UPDATE sessions SET expires_at = DATE_ADD(NOW(), INTERVAL 7 DAY) WHERE token = ?",
    [token]
  );

  return rows[0] as { id: number; name: string; email: string; role: string; company: string };
}

export async function destroySession(token: string): Promise<void> {
  await pool.execute("DELETE FROM sessions WHERE token = ?", [token]);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return validateSession(token);
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}
