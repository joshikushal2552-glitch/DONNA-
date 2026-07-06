import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { processEmailPayloadWithGemini } from "@/lib/gemini";

export const runtime = "nodejs";

const sandboxEmails = [
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
  },
  {
    id: "em_live5",
    sender: "founder-updates@ycombinator.com",
    subject: "Important: Demo Day Prep Review Slot",
    date: "June 24, 2026 - 09:20 PM",
    body: "Your product review slot is scheduled for Thursday at 11:30 AM. Bring metrics, retention notes, and the revised onboarding funnel screenshots."
  },
  {
    id: "em_live6",
    sender: "billing@cloud-runtime.io",
    subject: "Usage threshold warning for production workloads",
    date: "June 24, 2026 - 05:52 PM",
    body: "Your cloud account has reached 82% of the configured compute budget. Review autoscaling policies before the end of the billing cycle."
  },
  {
    id: "em_live7",
    sender: "recruiting@design-partners.ai",
    subject: "Portfolio review feedback and next steps",
    date: "June 23, 2026 - 01:10 PM",
    body: "The team liked your interaction design direction. Please send availability for a final conversation next Tuesday afternoon."
  },
  {
    id: "em_live8",
    sender: "promo@lucky-bonus-deals.biz",
    subject: "Congratulations, claim your exclusive bank reward",
    date: "June 23, 2026 - 10:31 AM",
    body: "Congratulations, you have been selected for an instant account bonus. Verify your bank identity through the attached suspicious link to claim funds."
  },
  {
    id: "em_live9",
    sender: "calendar@product-team.dev",
    subject: "Design systems sync moved to Friday",
    date: "June 22, 2026 - 04:05 PM",
    body: "The component audit meeting has moved to Friday at 4:00 PM IST. Agenda includes dashboard density, empty states, and loading motion."
  },
  {
    id: "em_live10",
    sender: "ops@incident-review.com",
    subject: "CRITICAL: Incident retrospective required",
    date: "June 22, 2026 - 08:18 AM",
    body: "A critical production incident review is required tomorrow at 10:00 AM. Include timeline notes, owner assignments, and mitigation actions."
  }
];

export async function POST(request: Request) {
  try {
    const { pageToken, sandboxOffset = 0 } = await request.json().catch(() => ({}));
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
    let nextPageToken: string | null = null;
    let nextSandboxOffset: number | null = null;

    if (providerToken) {
      try {
        const params = new URLSearchParams({ maxResults: "5" });
        if (pageToken) params.set("pageToken", pageToken);

        const listResponse = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages?${params.toString()}`, {
          headers: { Authorization: `Bearer ${providerToken}` }
        });

        if (listResponse.ok) {
          const listData = await listResponse.json();
          const messages = listData.messages || [];
          nextPageToken = listData.nextPageToken || null;
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
      const offset = Number(sandboxOffset) || 0;
      rawIncomingEmails = sandboxEmails.slice(offset, offset + 5);
      nextSandboxOffset = offset + 5 < sandboxEmails.length ? offset + 5 : null;
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
      data: processedResults,
      nextPageToken,
      nextSandboxOffset
    });

  } catch (error: any) {
    console.error("Critical dashboard sync orchestrator fault:", error);
    return NextResponse.json({ error: "Internal processing execution system fault." }, { status: 500 });
  }
}
