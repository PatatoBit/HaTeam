<nav class="nav">
	<div class="wrapper">
		<div class="tabs">
			<a href="/">ลงอีเวนท์ใหม่</a>
			<a href="/" class="active">ค้นหา</a>
			<a href="/">แชท</a>
		</div>
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

	.tabs {
		display: flex;
		flex-direction: row;
		gap: 2.5rem;
	}

	a {
		text-decoration: none;
		color: inherit;
		font-weight: 400;

		&.active {
			font-weight: 600;
		}
	}
</style>
