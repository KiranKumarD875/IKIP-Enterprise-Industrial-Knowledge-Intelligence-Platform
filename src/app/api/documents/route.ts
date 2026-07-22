import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { canPerformAction, recordUsage } from "@/lib/tokens";
import { RowDataPacket } from "mysql2";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, title, doc_type, file_size, status, created_at FROM documents WHERE user_id = ? ORDER BY created_at DESC",
      [user.id]
    );

    return NextResponse.json({ documents: rows });
  } catch (error) {
    console.error("Documents GET error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const allowed = await canPerformAction(user.id, "documents");
    if (!allowed) {
      return NextResponse.json(
        { error: "Monthly document upload limit reached (500). Resets next month." },
        { status: 429 }
      );
    }

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const doc_type = formData.get("doc_type") as string;
    let content = (formData.get("content") as string) || "";
    const file = formData.get("file") as File | null;

    if (!title) {
      return NextResponse.json({ error: "Document title is required." }, { status: 400 });
    }

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      if (file.name.toLowerCase().endsWith(".pdf")) {
        try {
          const pdfParse = require("pdf-parse");
          const pdfData = await pdfParse(buffer);
          content += "\n\n--- Extracted PDF Content ---\n" + pdfData.text;
        } catch (e) {
          console.error("PDF parse error:", e);
          content += "\n\n[Error extracting PDF text]";
        }
      } else {
        content += "\n\n--- Extracted File Content ---\n" + buffer.toString("utf-8");
      }
    }

    const [result] = await pool.execute(
      "INSERT INTO documents (user_id, title, doc_type, content, status) VALUES (?, ?, ?, ?, 'indexed')",
      [user.id, title, doc_type || "text", content]
    );

    await recordUsage(user.id, "documents");

    const docId = (result as { insertId: number }).insertId;
    return NextResponse.json(
      { message: "Document uploaded successfully.", document: { id: docId, title } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Documents POST error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
