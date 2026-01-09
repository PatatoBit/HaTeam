<script lang="ts">
	import '../styles/global.scss';
	import '../styles/_variables.scss';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '../components/Page/NavBar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<NavBar />

{@render children()}
