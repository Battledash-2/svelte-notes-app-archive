<script>
	import { onMount } from 'svelte';
	import { Link, navigate } from 'svroutes';
	import { Select } from 'svselect';
	import { v4 } from 'uuid';
	import { get, modify, update } from './helpers/storage';

	let content = '';
	let title = '';

	let selected;
	/** @type {import('svelte/store').Writable} */
	let selectedStore;

	onMount(() => {
		selectedStore.subscribe((v) => (selected = v));
	});

	let tags = get('tags', {});
	let options = [];

	Object.keys(tags).forEach(function (key) {
		options.push({
			label: tags[key],
			key,
		});
	});

	function click() {
		update(
			'notes',
			(prev) =>
				prev.push({
					id: v4(),
					title,
					content,
					tags: selected.map((c) => c.key),
				}),
			[]
		);
		if (selected && selected.length > 0) {
			let tags = selected;
			const obj = {};
			tags.map((o) => {
				obj[o.key] = o.label;
			});

			modify('tags', (prev) => ({ ...prev, ...obj }), {});
		}
		navigate('./');
	}
</script>

<div class="w-100 p-3">
	<div class="mb-3 d-flex">
		<h2>Create Note</h2>
		<div class="ms-auto">
			<button on:click={click} class="btn btn-primary">Save</button>
			<!-- <button class="btn btn-sm btn-outline-danger">Delete</button> -->
			<Link to="./">
				<button class="btn btn-outline-secondary">Cancel</button>
			</Link>
		</div>
	</div>
	<div class="d-flex gap-2">
		<div style="flex: 1; height: 100%;">
			<input
				bind:value={title}
				class="form-control w-100 mb-2"
				placeholder="Title"
			/>
		</div>
		<div style="flex: 1; height: 100%;">
			<Select
				bind:selected={selectedStore}
				onChange={(_, newV) =>
					// @ts-ignore
					newV.custom
						? {
								// @ts-ignore
								label: newV.label,
								key: v4(),
						  }
						: newV}
				allowcreate
				multiple
				hideselected
				{options}
				placeholder="Tags"
			/>
		</div>
	</div>
	<textarea
		bind:value={content}
		class="form-control w-100"
		style="height: 50vh"
		placeholder="Type your note here! This supports markdown."
	/>
</div>
