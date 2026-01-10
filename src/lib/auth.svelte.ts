import { supabase } from './supabaseClient';
import type { User, Session } from '@supabase/supabase-js';

class AuthState {
	user = $state<User | null>(null);
	session = $state<Session | null>(null);

	constructor() {
		$effect.root(() => {
			// Initialize
			supabase.auth.getSession().then(({ data }) => {
				this.session = data.session;
				this.user = data.session?.user ?? null;
			});

			// Listen for changes
			const {
				data: { subscription }
			} = supabase.auth.onAuthStateChange((_event, session) => {
				this.session = session;
				this.user = session?.user ?? null;
			});

			return () => {
				subscription.unsubscribe();
			};
		});
	}

	async signOut() {
		await supabase.auth.signOut();
	}
}

export const auth = new AuthState();
