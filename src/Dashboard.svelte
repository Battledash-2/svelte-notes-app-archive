<script>
	import { onMount } from 'svelte';
	import { Link } from 'svroutes';
	import { Select } from 'svselect';
	import { v4 } from 'uuid';
	import EditTags from './EditTags.svelte';
	import storage, { get } from './helpers/storage';
	import './styles/Dashboard.css';

	const notes = storage.get('notes', []);
	let viewNotes = notes.filter(() => true);

	let tags;

	let _tags;
	let options = [];

	function update() {
		tags = storage.get('tags', {});
		_tags = get('tags', {});

		Object.keys(_tags).forEach(function (key) {
			options.push({
				label: _tags[key],
				key,
			});
		});
	}

	update();

	/** @type {import('svelte/store').Writable} */
	let _selected;
	let selected;

	onMount(() => {
		_selected.subscribe((v) => (selected = v));
	});

	let title = '';
	$: selected,
		(viewNotes = notes.filter(
			(note) =>
				note.title.toLowerCase().includes(title.toLowerCase()) &&
				(selected == null || selected.length == 0)
					? true
					: note.tags.some((tag) =>
							selected.some((item) => item.key === tag)
					  )
			// console.log(note.tags)
		));

	function editTags() {}
</script>

<div class="w-100 p-3">
	<div class="d-flex">
		<h2>Notes</h2>
		<div class="ms-auto">
			<Link to="./new">
				<button class="btn btn-primary">New Note</button>
			</Link>
			<button
				data-bs-toggle="modal"
				data-bs-target="#editModal"
				class="btn btn-outline-secondary">Edit Tags</button
			>
		</div>
	</div>
	<hr />
	<div class="form mb-3">
		<div class="d-flex gap-2">
			<div style="flex: 1; height: 100%;">
				<input
					bind:value={title}
					class="form-control w-100 mb-2"
					placeholder="Search by Title"
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
					bind:selected={_selected}
					multiple
					hideselected
					{options}
					placeholder="Search by Tag"
				/>
			</div>
		</div>
	</div>
	<div>
		<div
			class="g-3 row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1"
		>
			{#each viewNotes as note}
				<Link
					style="color: inherit;"
					class="text-decoration-none"
					to={`./view/${note.id}`}
				>
					<div class="card text-decoration-none h-100 col">
						<div
							class="align-items-center justify-content-center h-100 vstack gap-2 minBreakpoint-xs card-body"
						>
							<span class="fs-5 text-decoration-none"
								>{note.title}</span
							>
							<!-- <span class="badge badge-pill bg-primary">Test</span> -->
							<div
								class="d-flex hstack justify-content-center gap-1"
							>
								{#each note.tags || [] as tag}
									<span class="badge badge-pill bg-primary">
										{tags[tag] || 'woops'}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</Link>
			{:else}
				<h6>Woops! Nothing here.</h6>
			{/each}
		</div>
	</div>
</div>

<EditTags {notes} {update} />
