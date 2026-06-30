# DONNA — AI Email Assistant

DONNA is a Next.js application that uses AI to classify emails, summarize content, and auto-schedule calendar events via Google integration.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Auth & Database:** Supabase
- **AI:** Google Gemini (primary) with Groq fallback
- **Styling:** Tailwind CSS

## Local Development

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous/public key |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI email analysis |
| `GROQ_API_KEY` | No | Groq API key (failover when Gemini is unavailable) |

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**.
4. In **Supabase Dashboard → Authentication → URL Configuration**, add:
   - Site URL: `https://your-vercel-domain.vercel.app`
   - Redirect URLs: `https://your-vercel-domain.vercel.app/auth-callback`
5. Deploy. Vercel auto-detects Next.js — no extra config needed.

## Google OAuth Setup (Supabase)

1. Enable Google provider in Supabase → Authentication → Providers.
2. Add Gmail and Calendar scopes in your Google Cloud Console OAuth consent screen.
3. Configure authorized redirect URI: `https://<your-supabase-ref>.supabase.co/auth/v1/callback`.
