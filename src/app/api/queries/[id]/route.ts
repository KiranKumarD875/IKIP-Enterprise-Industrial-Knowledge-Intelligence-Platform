import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const queryId = params.id;

    // Only allow deletion if the query belongs to the current user
    const [result] = await pool.execute(
      "DELETE FROM queries WHERE id = ? AND user_id = ?",
      [queryId, user.id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Query DELETE error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
