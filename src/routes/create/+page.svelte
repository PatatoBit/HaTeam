<script>
	import { supabase } from '$lib/supabaseClient';

	let fee_enabled = false;
	let age_restriction_enabled = false;

	let userInput = {
		image: null,
		name: '',
		event_link: '',
		open_date: new Date().toISOString().split('T')[0],
		open_time: '00:00',
		close_date: new Date().toISOString().split('T')[0],
		close_time: '23:59',
		fee_amount: null,
		min_age: null,
		max_age: null
	};

	const handleSubmit = () => {
		// Handle form submission logic here
		userInput.fee_amount = fee_enabled ? userInput.fee_amount : null;
		userInput.min_age = age_restriction_enabled ? userInput.min_age : null;
		userInput.max_age = age_restriction_enabled ? userInput.max_age : null;

		console.log('Form submitted with data:', userInput);

		supabase.functions
			.invoke('new-event-create', {
				body: JSON.stringify(userInput)
			})
			.then((response) => {
				console.log('Function response:', response);
			})
			.catch((error) => {
				console.error('Function error:', error);
			});
	};
</script>

<main class="create-event-page">
	<div class="inputs">
		<div class="input-section">
			<input type="file" bind:value={userInput.image} />
		</div>

		<div class="input-section">
			<input type="text" placeholder="ชื่องาน" bind:value={userInput.name} />
		</div>

		<div class="input-section">
			<input type="text" placeholder="ลิงก์งาน" bind:value={userInput.event_link} />
		</div>

		<div class="input-section">
			<input type="date" id="start" name="open_date" bind:value={userInput.open_date} />
			<input type="time" id="appt" name="open_time" bind:value={userInput.open_time} />
		</div>

		<div class="input-section">
			<input type="date" id="end" name="close_date" bind:value={userInput.close_date} />
			<input type="time" id="appt" name="close_time" bind:value={userInput.close_time} />
		</div>

		<div class="input-section">
			<input type="checkbox" bind:checked={fee_enabled} />
			<input
				disabled={!fee_enabled}
				type="number"
				placeholder="ค่าสมัคร"
				bind:value={userInput.fee_amount}
			/>
		</div>

		<div class="input-section">
			<input type="checkbox" bind:checked={age_restriction_enabled} />
			<input
				disabled={!age_restriction_enabled}
				type="number"
				placeholder="อายุต่ำสุด"
				bind:value={userInput.min_age}
			/>
			<input
				disabled={!age_restriction_enabled}
				type="number"
				placeholder="อายุสูงสุด"
				bind:value={userInput.max_age}
			/>
		</div>

		<div class="input-section">
			<input
				type="submit"
				class="submit-btn"
				value="ลงงานใหม่"
				onclick={async () => await handleSubmit()}
			/>
		</div>
	</div>

	<div class="editor"></div>
</main>

<style lang="scss">
	.create-event-page {
		padding: 2rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 2rem;
	}

	.inputs {
		display: flex;
		flex: 0 1 200px;
		flex-direction: column;
		gap: 1rem;
	}

	.editor {
		flex: 1 1 500px;
		border: 1px solid #ccc;
		border-radius: 0.25rem;

		height: 500px;
	}

	.input-section {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	input[type='text'],
	input[type='date'],
	input[type='time'],
	input[type='number'] {
		flex: 1;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}

	input[type='checkbox'] {
		align-self: center;
	}

	.submit-btn {
		width: 100%;
	}
</style>
