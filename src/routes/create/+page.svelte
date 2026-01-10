<script>
	import { supabase } from '$lib/supabaseClient';

	let userInput = {
		image: null,
		title: '',
		link: '',
		open_at: new Date().toISOString().split('T')[0],
		open_at_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
		close_at: new Date().toISOString().split('T')[0],
		close_at_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
		fee_enabled: false,
		fee_amount: null,
		age_restriction_enabled: false,
		min_age: null,
		max_age: null
	};

	const handleSubmit = () => {
		// Handle form submission logic here
		console.log('Form submitted with data:', userInput);

		supabase.functions
			.invoke('hello-world', {
				body: JSON.stringify({ name: 'SvelteKit User' })
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
			<input type="text" placeholder="ชื่องาน" bind:value={userInput.title} />
		</div>

		<div class="input-section">
			<input type="text" placeholder="ลิงก์งาน" bind:value={userInput.link} />
		</div>

		<div class="input-section">
			<input type="date" id="start" name="open_at" bind:value={userInput.open_at} />
			<input type="time" id="appt" name="open_at_time" bind:value={userInput.open_at_time} />
		</div>

		<div class="input-section">
			<input type="date" id="end" name="close_at" bind:value={userInput.close_at} />
			<input type="time" id="appt" name="close_at_time" bind:value={userInput.close_at_time} />
		</div>

		<div class="input-section">
			<input type="checkbox" bind:checked={userInput.fee_enabled} />
			<input type="number" placeholder="ค่าสมัคร" bind:value={userInput.fee_amount} />
		</div>

		<div class="input-section">
			<input type="checkbox" bind:checked={userInput.age_restriction_enabled} />
			<input type="number" placeholder="อายุต่ำสุด" bind:value={userInput.min_age} />
			<input type="number" placeholder="อายุสูงสุด" bind:value={userInput.max_age} />
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
