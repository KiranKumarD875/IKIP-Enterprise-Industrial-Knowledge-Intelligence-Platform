import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, getSessionCookieName } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(getSessionCookieName())?.value;

    if (token) {
      await destroySession(token);
    }

    const response = NextResponse.json({ message: "Logged out successfully." });
    response.cookies.delete(getSessionCookieName());

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
