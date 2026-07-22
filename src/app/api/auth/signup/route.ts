import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword, createSession, getSessionCookieName } from "@/lib/auth";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, company } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const [existing] = await pool.execute<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Create user
    const passwordHash = await hashPassword(password);
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password_hash, role, company) VALUES (?, ?, ?, ?, ?)",
      [name, email, passwordHash, role || "User", company || ""]
    );

    const userId = (result as { insertId: number }).insertId;

    // Create session
    const token = await createSession(userId);

    const response = NextResponse.json(
      { message: "Account created successfully.", user: { id: userId, name, email } },
      { status: 201 }
    );

    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
