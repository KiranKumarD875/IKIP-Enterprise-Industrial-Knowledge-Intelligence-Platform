import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const { query_id, rating, comment } = await req.json();

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
    }

    await pool.execute(
      "INSERT INTO feedback (user_id, query_id, rating, comment) VALUES (?, ?, ?, ?)",
      [user.id, query_id || null, rating, comment || ""]
    );

    return NextResponse.json({ message: "Feedback submitted. Thank you!" }, { status: 201 });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
