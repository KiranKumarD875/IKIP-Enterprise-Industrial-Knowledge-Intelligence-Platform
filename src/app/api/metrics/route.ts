import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    // 1. Total Documents
    const [docsRes] = await pool.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM documents WHERE user_id = ?",
      [user.id]
    );
    const totalDocuments = docsRes[0].count;

    // 2. Total Queries
    const [queriesRes] = await pool.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM queries WHERE user_id = ?",
      [user.id]
    );
    const totalQueries = queriesRes[0].count;

    // 3. Average Confidence
    const [confRes] = await pool.execute<RowDataPacket[]>(
      "SELECT AVG(confidence) as avgConf FROM queries WHERE user_id = ? AND confidence > 0",
      [user.id]
    );
    const avgConf = confRes[0].avgConf;
    const avgConfidence = avgConf ? `${Math.round(avgConf)}%` : "0%";

    // 4. Processing Documents
    const [procRes] = await pool.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM documents WHERE user_id = ? AND status IN ('uploaded', 'processing')",
      [user.id]
    );
    const processingDocuments = procRes[0].count;

    // 5. Recent Documents (Last 30 days)
    const [recentRes] = await pool.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as count FROM documents WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)",
      [user.id]
    );
    const recentDocuments = recentRes[0].count;

    return NextResponse.json({
      totalDocuments,
      totalQueries,
      avgConfidence,
      processingDocuments,
      recentDocuments,
    });
  } catch (error) {
    console.error("Metrics error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
