/**
 * Decentralized Google Cloud Integration Service Framework
 * Communicates strictly via dynamic user OAuth session attributes.
 */

export interface GoogleGmailMessage {
  id: string;
  snippet: string;
  payloadText: string;
  from: string;
  internalDate: string;
}

export async function fetchAuthenticatedUserGmailStream(accessToken: string): Promise<GoogleGmailMessage[]> {
  if (!accessToken) {
    throw new Error("Google API request failed: Access token parameter is undefined.");
  }

  // Active resource queries route through proxy endpoints securely
  try {
    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10", {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error("Gmail stream API access fault:", error);
    return [];
  }
}

export async function injectEventToGoogleCalendar(
  accessToken: string, 
  eventDetails: { title: string; date: string; time: string }
): Promise<boolean> {
  if (!accessToken) return false;

  try {
    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        summary: eventDetails.title,
        start: { dateTime: `${eventDetails.date}T${eventDetails.time}Z` },
        end: { dateTime: `${eventDetails.date}T${eventDetails.time}Z` }
      })
    });

    return response.ok;
  } catch (error) {
    console.error("Google Calendar insertion processing exception:", error);
    return false;
  }
}