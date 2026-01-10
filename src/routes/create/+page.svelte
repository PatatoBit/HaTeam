<script lang="ts">
	import { supabase } from '$lib/supabaseClient';

	let fee_enabled = false;
	let age_restriction_enabled = false;

	let userInput = {
		image_url: null,
		name: 'OEC Hackathon 2024',
		event_link: 'https://www.hackathonthailand.com/oec',
		open_date: new Date().toISOString().split('T')[0],
		open_time: '00:00',
		close_date: new Date().toISOString().split('T')[0],
		close_time: '23:59',
		fee: null,
		min_age: null,
		max_age: null
	};

	let previewUrl: string | null = null;
	let isDragging = false;

	const handleFiles = (files: FileList | any[]) => {
		if (files && files.length > 0) {
			const file = files[0];
			if (file.type.startsWith('image/')) {
				previewUrl = URL.createObjectURL(file);
			}
		}
	};

	const onDrop = (e: DragEvent) => {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer && e.dataTransfer.files) {
			handleFiles(Array.from(e.dataTransfer.files));
		}
	};

	const onDragOver = (e: DragEvent) => {
		e.preventDefault();
		isDragging = true;
	};

	const onDragLeave = (e: DragEvent) => {
		e.preventDefault();
		isDragging = false;
	};

	const onPaste = (e: ClipboardEvent) => {
		if (e.clipboardData && e.clipboardData.files.length > 0) {
			e.preventDefault();
			handleFiles(Array.from(e.clipboardData.files));
		}
	};

	const handleSubmit = () => {
		// Handle form submission logic here
		userInput.fee = fee_enabled ? userInput.fee : null;
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

<svelte:window onpaste={onPaste} />

<main class="create-event-page">
	<div class="inputs">
		<div class="input-section">
			<label
				class="file-upload"
				class:dragging={isDragging}
				ondrop={onDrop}
				ondragover={onDragOver}
				ondragleave={onDragLeave}
			>
				<input
					type="file"
					hidden
					accept="image/*"
					onchange={(e) =>
						e.target instanceof HTMLInputElement && e.target.files && handleFiles(e.target.files)}
				/>
				{#if previewUrl}
					<div class="upload-preview">
						<img src={previewUrl} alt="Preview" />
					</div>
				{:else}
					<div class="upload-content">
						<img src="/icons/cloud-upload.svg" alt="Upload" class="upload-icon" />
						<span>อัปโหลดรูปภาพ</span>
						<span class="recommendation">แนะนำอัตราส่วน 4:5</span>
					</div>
				{/if}
			</label>
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
				bind:value={userInput.fee}
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

	.file-upload {
		flex: 1;
		cursor: pointer;
		border: 2px dashed #ccc;
		border-radius: 0.5rem;
		padding: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: border-color 0.2s;
		background-color: #f9f9f9;

		&:hover,
		&.dragging {
			border-color: #666;
			background-color: #f0f0f0;
		}
	}

	.upload-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		color: #666;
		font-size: 0.9rem;
	}

	.recommendation {
		font-size: 0.8rem;
		color: #999;
	}

	.upload-preview {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
			max-height: 300px;
		}
	}

	.upload-icon {
		width: 32px;
		height: 32px;
		opacity: 0.6;
	}
</style>
