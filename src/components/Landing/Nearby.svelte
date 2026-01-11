<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
</script>

<div class="wrapper">
	<h2>ใกล้ตัว</h2>

	<div class="nearby-posts">
		{#each Array(5) as item}
			<div class="post">
				<div class="post-image"></div>
				<p class="label">19-24 มี.ค. 2025</p>
				<h3>Bangrak Hackathon</h3>
				<p>ย่านการค้าบางรัก</p>

				<p><strong>3 ทีม </strong> กำลังหาสมาชิกเพิ่ม</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.nearby-posts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

		gap: 1rem;
		margin-top: 1rem;
	}

	@media (max-width: 768px) {
		.nearby-posts {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.post-image {
		margin-bottom: 1rem;
		width: 100%;
		height: auto;
		background-color: grey;
		aspect-ratio: 0.7;
	}

	.post {
		padding: 0.5rem 0;
	}
</style>
