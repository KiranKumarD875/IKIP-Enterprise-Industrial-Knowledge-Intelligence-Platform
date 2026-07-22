import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { canPerformAction, recordUsage } from "@/lib/tokens";
import { RowDataPacket } from "mysql2";

// Simulated AI responses for demo purposes
const AI_RESPONSES: Record<string, { text: string; confidence: number; sources: string }> = {
  default: {
    text: "Based on the available documentation and maintenance records, I can provide the following analysis. The data suggests patterns consistent with standard operational parameters. For more detailed insights, please upload relevant maintenance logs and equipment documentation.",
    confidence: 85,
    sources: "General Knowledge Base",
  },
};

function generateResponse(query: string): { text: string; confidence: number; sources: string } {
  const q = query.toLowerCase();

  if (q.includes("pump") || q.includes("failure") || q.includes("maintenance")) {
    return {
      text: `Analysis of maintenance records indicates that pump systems typically show degradation patterns 14-21 days before failure. Key indicators include increased vibration amplitude (>4.5 mm/s), elevated bearing temperature (>85°C), and abnormal flow rate fluctuations. Recommended action: Schedule predictive maintenance inspection within the next 7 days.`,
      confidence: 92,
      sources: "Maintenance_Log_2024.pdf, Equipment_Manual_P201.pdf",
    };
  }

  if (q.includes("compliance") || q.includes("iso") || q.includes("audit")) {
    return {
      text: `Current compliance status review shows 94% alignment with ISO 45001:2018 requirements. Three control areas require attention: §8.2 Emergency Preparedness (2 overdue drills), §6.1.2 Risk Assessment (annual review pending), and §9.1.2 Compliance Evaluation (Q3 internal audit not scheduled). Recommended: Address overdue items within 30 days.`,
      confidence: 96,
      sources: "Compliance_Matrix_2024.xlsx, ISO45001_Gap_Analysis.pdf",
    };
  }

  if (q.includes("safety") || q.includes("incident") || q.includes("risk")) {
    return {
      text: `Safety incident analysis over the past 12 months shows a 23% reduction in near-miss events. The top contributing factors for reported incidents are: inadequate PPE usage (34%), procedural non-compliance (28%), and equipment malfunction (18%). The trend indicates improving safety culture, with the Behavioral Safety Observation program contributing to a 40% increase in hazard reporting.`,
      confidence: 89,
      sources: "Safety_Dashboard_2024.pdf, Incident_Reports_Q1-Q4.csv",
    };
  }

  return AI_RESPONSES.default;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    // Properly remove query history older than 24 hours
    await pool.execute(
      "DELETE FROM queries WHERE created_at < DATE_SUB(NOW(), INTERVAL 24 HOUR)"
    );

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT id, query_text, response_text, confidence, sources, tokens_used, created_at FROM queries WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
      [user.id]
    );

    return NextResponse.json({ queries: rows });
  } catch (error) {
    console.error("Queries GET error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
    }

    const allowed = await canPerformAction(user.id, "queries");
    if (!allowed) {
      return NextResponse.json(
        { error: "Monthly query limit reached (100). Resets next month." },
        { status: 429 }
      );
    }

    const { query_text, document_id } = await req.json();

    if (!query_text || query_text.trim().length === 0) {
      return NextResponse.json({ error: "Query text is required." }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // We no longer block if no API key is present! We will use our Enhanced Local Simulator.

    let responseText = "";
    let confidence = 0;
    let sources = "";

    try {
      let docText = "";
      let docTitle = "";

      if (document_id) {
        const [docRows] = await pool.execute<RowDataPacket[]>(
          "SELECT title, content FROM documents WHERE id = ? AND user_id = ?",
          [document_id, user.id]
        );
        if (docRows.length === 0) {
          return NextResponse.json({ error: "Document not found." }, { status: 404 });
        }
        docTitle = docRows[0].title;
        docText = docRows[0].content;
        sources = docTitle;
      }

      const systemPrompt = document_id
        ? `You are an expert industrial AI assistant for the IKIP platform. 
           Please answer the user's question based strictly on the following document content. 
           Format your response beautifully with markdown, using bullet points or bold text where appropriate.
           Do NOT invent information that is not in the document.
           
           Document Title: ${docTitle}
           Document Content:
           ${docText}`
        : `You are an expert industrial AI assistant for the IKIP platform. 
           Answer the following question regarding industrial maintenance, compliance, or asset management. 
           Format your response beautifully with markdown, using bullet points or bold text where appropriate.`;

      if (groqKey) {
        const { default: OpenAI } = await import("openai");
        const openai = new OpenAI({ 
          apiKey: groqKey,
          baseURL: "https://api.groq.com/openai/v1"
        });
        
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query_text }
          ],
          model: "llama-3.1-8b-instant",
        });
        
        responseText = completion.choices[0].message.content || "";
        confidence = document_id ? 95 : 85;
      } else if (openaiKey) {
        const { default: OpenAI } = await import("openai");
        const openai = new OpenAI({ apiKey: openaiKey });
        
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: query_text }
          ],
          model: "gpt-3.5-turbo",
        });
        
        responseText = completion.choices[0].message.content || "";
        confidence = document_id ? 95 : 85;
      } else if (geminiKey) {
        const { GoogleGenerativeAI } = await import("@google/generative-ai");
        const genAI = new GoogleGenerativeAI(geminiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `${systemPrompt}\n\nUser Question: ${query_text}`;
        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        confidence = document_id ? 95 : 85;
      } else {
        // ENHANCED LOCAL SIMULATOR (No API Key needed, totally free)
        if (document_id) {
          const contentStr = docText.toLowerCase();
          const qTerms = query_text.toLowerCase().split(" ").filter((t: string) => t.length > 3);
          
          let matchedTerm = "";
          for (const term of qTerms) {
            if (contentStr.includes(term)) {
              matchedTerm = term;
              break;
            }
          }

          if (matchedTerm) {
            const index = contentStr.indexOf(matchedTerm);
            const snippetStart = Math.max(0, index - 150);
            const snippetEnd = Math.min(contentStr.length, index + 300);
            let snippet = docText.substring(snippetStart, snippetEnd).replace(/\n/g, ' ');

            // Try to make it look like a clean, structured AI response
            responseText = `Based on the document **${docTitle}**, here is what I found regarding **"${matchedTerm}"**:\n\n` +
                           `* **Extracted Insight:** "...${snippet.trim()}..."\n\n` +
                           `*(Note: This is generated by the free local simulator. Add an API key for perfect AI reasoning!)*`;
            confidence = 90;
          } else {
            responseText = `I scanned the document **${docTitle}** but could not find specific information related to your query.\n\nPlease try rephrasing your question or check if the document contains the relevant data.`;
            confidence = 40;
          }
        } else {
          responseText = `**IKIP AI Copilot**\n\nI am currently running in **Local Simulator Mode** (no API key required).\n\nTo answer general knowledge questions, please provide a document for context or configure a free AI API key (like Groq) in your environment variables.`;
          confidence = 50;
        }
      }

      if (!document_id) sources = "General AI Knowledge";

    } catch (e: any) {
      console.error("AI API error:", e);
      return NextResponse.json({ error: `AI Error: ${e.message || 'Failed to generate response. Check API key.'}` }, { status: 500 });
    }

    const [result] = await pool.execute(
      "INSERT INTO queries (user_id, document_id, query_text, response_text, confidence, sources, tokens_used) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [user.id, document_id || null, query_text, responseText, confidence, sources, 1]
    );

    await recordUsage(user.id, "queries");

    const queryId = (result as { insertId: number }).insertId;
    return NextResponse.json({
      id: queryId,
      query_text,
      response_text: responseText,
      confidence,
      sources,
    });
  } catch (error) {
    console.error("Queries POST error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
