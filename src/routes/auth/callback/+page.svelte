<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	onMount(async () => {
		// implicit OAuth flow, getSession() reads the hash automatically
		const {
			data: { session },
			error
		} = await supabase.auth.getSession();

		if (error || !session) {
			console.error('Auth failed:', error);
			goto('/login?error=auth_failed');
			return;
		}

		console.log('✅ Login success:', session.user.email);
		goto('/');
	});
</script>

<div class="callback">
	<p>Completing login...</p>
</div>
