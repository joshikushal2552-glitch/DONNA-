import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

/**
 * Global Client-Side Supabase Client Constructor
 * Configured specifically to automatically pass session keys into cookies
 * rather than isolating them to the browser's local storage.
 */
export const supabase = createClientComponentClient();