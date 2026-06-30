import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { processEmailPayloadWithGemini } from "@/lib/gemini";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabaseServer = createRouteHandlerClient({ cookies: () => cookieStore });

    const { data: { session } } = await supabaseServer.auth.getSession();
    const providerToken = session?.provider_token;
    
    // --- BACKEND DIAGNOSTIC LOGS ---
    console.log("=== DONNA OAUTH PIPELINE CORE CHECK ===");
    console.log(`Is User Authenticated: ${!!session?.user}`);
    console.log(`Active Account Identity: ${session?.user?.email}`);
    console.log(`Google OAuth Token Found: ${!!providerToken}`);
    // --------------------------------

    let rawIncomingEmails = [];
    let connectionMode: "live" | "sandbox" = "sandbox";

    if (providerToken) {
      try {
        const listResponse = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5", {
          headers: { Authorization: `Bearer ${providerToken}` }
        });

        if (listResponse.ok) {
          const listData = await listResponse.json();
          const messages = listData.messages || [];
          console.log(`Gmail API Connectivity Status: SUCCESS. Messages Found: ${messages.length}`);

          if (messages.length > 0) {
            connectionMode = "live";
            rawIncomingEmails = await Promise.all(
              messages.map(async (msg: any) => {
                const detailResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`, {
                  headers: { Authorization: `Bearer ${providerToken}` }
                });
                const detailData = await detailResponse.json();
                const headers = detailData.payload?.headers || [];
                
                return {
                  id: msg.id,
                  sender: headers.find((h: any) => h.name.toLowerCase() === "from")?.value || "Unknown Origin",
                  subject: headers.find((h: any) => h.name.toLowerCase() === "subject")?.value || "No Subject Context",
                  date: headers.find((h: any) => h.name.toLowerCase() === "date")?.value || "Recent Stream",
                  body: detailData.snippet || "Empty body payload snippet."
                };
              })
            );
          }
        } else {
          const failureText = await listResponse.text();
          console.error("=== GOOGLE GMAIL API REJECTION DETAILS ===");
          console.error(`HTTP Status: ${listResponse.status}`);
          console.error(`Google API Error Payload: ${failureText}`);
          console.error("==========================================");
        }
      } catch (gmailError) {
        console.error("Gmail network link execution exception:", gmailError);
      }
    }

    // Dynamic fallback array activated if live mailbox checks are empty or rejected
    if (rawIncomingEmails.length === 0) {
      console.log("System Status Notification: Returning Sandbox Simulation Data Stream.");
      connectionMode = "sandbox";
      rawIncomingEmails = [
        {
          id: "em_live1",
          sender: "security@corporate-core.com",
          subject: "CRITICAL: Database Access Key Credentials Rotated Immediately",
          date: "June 28, 2026 - 08:32 AM",
          body: "We detected an anomalies matrix alignment profile trace matching token headers on Section-C pipelines. Please execute the custom script credentials update string by tomorrow morning 10:00 AM to keep your environments isolated."
        },
        {
          id: "em_live2",
          sender: "notifications@flipkart-grid.unstop",
          subject: "Flipkart GRiD 7.0 Technical Engineering Assessment Progression Updates",
          date: "June 27, 2026 - 04:15 PM",
          body: "Congratulations. Your team profile has successfully cleared the round evaluation phases. The absolute tracking proctored algorithm review stage starts this Friday, July 3rd at 02:00 PM IST."
        },
        {
          id: "em_live3",
          sender: "marketing-blast@deals-online.xyz",
          subject: "Super Luxury foldout hydraulic treadmill special promotions coupon deals!",
          date: "June 26, 2026 - 11:02 AM",
          body: "Get 80% discount credits instantly inside our structural fitness items distribution center page list logs. Limited hours offer allocation."
        },
        {
          id: "em_live4",
          sender: "accounts-verify@secure-bank-support.net",
          subject: "SUSPICIOUS ACTIVITY WARNING: Identity Verification Transfer Files Required",
          date: "June 25, 2026 - 01:40 AM",
          body: "Your banking interface access protocols are suspended pending direct secure credential inputs. Please input your secure database client credentials string via this untracked routing URL."
        }
      ];
    }

    const processedResults = await Promise.all(
      rawIncomingEmails.map(async (email: any) => {
        try {
          const aiAnalysisResult = await processEmailPayloadWithGemini(email.body, email.sender);
          return {
            ...email,
            category: aiAnalysisResult.category || "important",
            aiAnalysis: aiAnalysisResult.analysis || "Analysis currently unavailable.",
            detectedEvent: aiAnalysisResult.eventDetected || undefined
          };
        } catch (innerError) {
          return {
            ...email,
            category: "important",
            aiAnalysis: "DONNA processed this item via engine failover defaults."
          };
        }
      })
    );

    return NextResponse.json({ 
      success: true, 
      mode: connectionMode, 
      data: processedResults 
    });

  } catch (error: any) {
    console.error("Critical dashboard sync orchestrator fault:", error);
    return NextResponse.json({ error: "Internal processing execution system fault." }, { status: 500 });
  }
}