<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	onMount(async () => {
		const { error } = await supabase.auth.getSession();
		if (error) {
			console.error('Error getting session:', error);
		}
		// Redirect to home after handling callback
		goto('/');
	});
</script>

<div class="callback">
	<p>Generating session...</p>
</div>

<style>
	.callback {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
