import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    // Use the official handler client which maps internal Supabase cookie chunks perfectly
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    try {
      // Exchange the code for a live session and let the SDK handle cookie serialization natively
      await supabase.auth.exchangeCodeForSession(code);
    } catch (exchangeError) {
      console.error("OAuth token exchange runtime exception:", exchangeError);
      return NextResponse.redirect(`${requestUrl.origin}/auth/login?error=exchange_fault`);
    }
  }

  // URL extraction complete. Route the authenticated user onto the working cockpit dashboard
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}