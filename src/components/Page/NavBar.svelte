<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { auth } from '$lib/auth.svelte';

	const signIn = async () => {
		supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
	};

	const signOut = async () => {
		await auth.signOut();
	};
</script>

<nav class="nav">
	<div class="wrapper">
		<div class="tabs">
			<a href="/">ลงอีเวนท์ใหม่</a>
			<a href="/" class="active">ค้นหา</a>
			<a href="/">แชท</a>
		</div>

		{#if auth.user}
			<div class="user-menu">
				<span>{auth.user.email}</span>
				<button class="signin" onclick={signOut}>ออกจากระบบ</button>
			</div>
		{:else}
			<button class="signin" onclick={signIn}>ลงชื่อเข้าใช้</button>
		{/if}
	</div>
</nav>

<style lang="scss">
	.nav {
		height: 4rem;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.wrapper {
		width: 100%;
		display: flex;
	}

	.tabs {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		gap: 2.5rem;
		align-items: center;
		align-self: center;
		flex-grow: 1;
	}

	.signin {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.5rem;
		background-color: var(--primary);
		color: #fff;
		cursor: pointer;
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		font-weight: 400;

		&.active {
			font-weight: 600;
		}

		&:first-child {
			justify-self: end;
		}

		&:last-child {
			justify-self: start;
		}
	}
</style>
