import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, role, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    await pool.execute(
      "INSERT INTO contact_submissions (name, email, company, role, message) VALUES (?, ?, ?, ?, ?)",
      [name, email, company || "", role || "", message || ""]
    );

    return NextResponse.json(
      { message: "Your message has been received. We'll get back to you soon!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
