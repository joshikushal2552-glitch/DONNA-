import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Initialize the Supabase client wrapper inside the Next.js middleware execution layer
  const supabase = createMiddlewareClient({ req, res });

  // Explicitly forces Supabase to refresh the session cookie from headers if expired
  await supabase.auth.getSession();

  return res;
}

// Ensure the middleware runs across all application routes and API processing segments
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};