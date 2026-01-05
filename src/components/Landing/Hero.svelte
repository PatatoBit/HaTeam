<main class="hero">
	<div class="wrapper">
		<h1>หาเพื่อนร่วม <span class="event-highlight">แฮกกาธอน</span> ใกล้ตัวคุณ</h1>

		<div class="hero-search">
			<select name="cars" id="eventType">
				<option value="hackathon">แฮกกาธอน</option>
				<option value="camp">เข้าค่าย</option>
				<option value="game">แข่งเกม</option>
			</select>

			<input type="text" />
		</div>
	</div>
</main>

<style lang="scss">
	.hero {
		background-color: var(--secondary);
		color: var(--white);
	}

	.event-highlight {
		text-decoration: underline;
	}

	.hero-search {
		display: flex;
		gap: 0;
		margin-bottom: 1rem;

		input {
			flex: 1;
			padding: 0.5rem;
			font-size: 1rem;
		}
	}
</style>
