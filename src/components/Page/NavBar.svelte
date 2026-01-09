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

	.wrapper {
		width: 100%;
	}

	.tabs {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		width: 100%;
		gap: 2.5rem;
		align-items: center;
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
