import pool from "./db";
import { RowDataPacket } from "mysql2";

// Monthly token limits (free tier)
export const LIMITS = {
  queries: 100,
  documents: 500,
  searches: 1000,
};

export type ActionType = "queries" | "documents" | "searches";

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function getUsage(
  userId: number
): Promise<{ queries_used: number; documents_uploaded: number; searches_used: number }> {
  const month = getCurrentMonth();

  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT queries_used, documents_uploaded, searches_used FROM token_usage WHERE user_id = ? AND month = ?",
    [userId, month]
  );

  if (rows.length === 0) {
    return { queries_used: 0, documents_uploaded: 0, searches_used: 0 };
  }

  return rows[0] as { queries_used: number; documents_uploaded: number; searches_used: number };
}

export async function canPerformAction(
  userId: number,
  action: ActionType
): Promise<boolean> {
  const usage = await getUsage(userId);

  switch (action) {
    case "queries":
      return usage.queries_used < LIMITS.queries;
    case "documents":
      return usage.documents_uploaded < LIMITS.documents;
    case "searches":
      return usage.searches_used < LIMITS.searches;
    default:
      return false;
  }
}

export async function recordUsage(
  userId: number,
  action: ActionType
): Promise<void> {
  const month = getCurrentMonth();

  const columnMap: Record<ActionType, string> = {
    queries: "queries_used",
    documents: "documents_uploaded",
    searches: "searches_used",
  };

  const column = columnMap[action];

  await pool.execute(
    `INSERT INTO token_usage (user_id, month, ${column}) VALUES (?, ?, 1)
     ON DUPLICATE KEY UPDATE ${column} = ${column} + 1`,
    [userId, month]
  );
}
