import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "nodejs";

// Helper to format Date to YYYY-MM-DDTHH:MM:SS without UTC conversion
const formatToLocalISO = (d: Date) => {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabaseServer = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { session } } = await supabaseServer.auth.getSession();
    const providerToken = session?.provider_token;

    if (!providerToken) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { title, date, time, timeZone } = await request.json();

    // 1. Create start date and add 1 hour for end date
    const startDate = new Date(`${date}T${time}`);
    const endDate = new Date(startDate.getTime() + (60 * 60 * 1000));

    // 2. Format to YYYY-MM-DDTHH:MM:SS
    const startDateTime = formatToLocalISO(startDate);
    const endDateTime = formatToLocalISO(endDate);

    const googleCalendarResponse = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        summary: `DONNA: ${title}`,
        start: { 
          dateTime: startDateTime, 
          timeZone: timeZone || "Asia/Kolkata"
        },
        end: { 
          dateTime: endDateTime,
          timeZone: timeZone || "Asia/Kolkata"
        },
        reminders: { useDefault: true }
      })
    });

    if (!googleCalendarResponse.ok) {
      const errorDetail = await googleCalendarResponse.text();
      console.error("Calendar API Error Detail:", errorDetail);
      throw new Error(`Calendar API returned status code ${googleCalendarResponse.status}`);
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Calendar insertion fault:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}