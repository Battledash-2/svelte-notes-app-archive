<script>
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Link, navigate } from 'svroutes';
	import { Select } from 'svselect';
	import { v4 } from 'uuid';
	import storage, { get, modify } from './helpers/storage';

	export let params;
	const { noteId } = params;

	const note = storage.search('notes', (n) => n.id === noteId, []);

	let content = note.content || '???';
	let title = note.title || '???';
	let tags = note.tags || [];

	let _tags = get('tags', {});
	let options = [];
	Object.keys(_tags).forEach(function (key) {
		options.push({
			label: _tags[key],
			key,
		});
	});

	let selected;
	/** @type {import('svelte/store').Writable} */
	let selectedStore = writable(
		tags.map((c) => options.filter((a) => a.key === c)[0])
	);

	onMount(() => {
		selectedStore.subscribe((v) => (selected = v));
	});

	function click() {
		modify(
			'notes',
			(prev) =>
				prev.map((n) =>
					n.id === noteId
						? {
								...n,
								title,
								content,
								tags: selected.map((c) => c.key),
						  }
						: n
				),
			[]
		);
		if (selected && selected.length > 0) {
			const obj = {};
			selected.map((o) => {
				obj[o.key] = o.label;
			});

			modify('tags', (prev) => ({ ...prev, ...obj }), {});
		}
		navigate('../');
	}
</script>

<div class="w-100 p-3">
	<div class="mb-3 d-flex">
		<h2>Create Note</h2>
		<div class="ms-auto">
			<button on:click={click} class="btn btn-primary">Save</button>
			<!-- <button class="btn btn-sm btn-outline-danger">Delete</button> -->
			<Link to="../">
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
				selected={selectedStore}
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
