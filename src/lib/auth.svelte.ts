import { writable } from "svelte/store";
import { supabase } from "$lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export const auth = writable<{ user: User | null }>({ user: null });

// Initialize on mount
supabase.auth.getSession().then(({ data: { session } }) => {
	auth.set({ user: session?.user ?? null });
});

supabase.auth.onAuthStateChange((event, session) => {
	auth.set({ user: session?.user ?? null });
});
