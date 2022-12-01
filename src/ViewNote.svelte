<script>
	import { Link, navigate } from 'svroutes';
	import storage, { get, modify } from './helpers/storage';
	import { marked } from 'marked';

	const tags = get('tags', {});

	export let params;
	const { noteId } = params;

	const note = storage.search('notes', (n) => n.id == noteId, []);

	function deleteNote() {
		modify('notes', (prev) => prev.filter((n) => n.id !== noteId), []);
		navigate('../');
	}
</script>

<!-- <div class="d-flex hstack justify-content-center gap-1">
			{#each note.tags || [] as tag}
				<span class="badge badge-pill bg-primary">
					{tags[tag] || 'woops'}
				</span>
			{/each}
		</div> -->

<div class="w-100 p-3">
	<div class="mb-3 d-flex">
		<div class="d-flex vstack">
			<h2>{note.title}</h2>
			<div class="d-flex hstack justify-content-start gap-1">
				{#each note.tags || [] as tag}
					<span class="badge badge-pill bg-primary">
						{tags[tag] || 'woops'}
					</span>
				{/each}
			</div>
		</div>

		<div class="ms-auto">
			<Link to={`../edit/${note.id}`}>
				<button class="btn btn-primary">Edit</button>
			</Link>
			<button on:click={deleteNote} class="btn btn-outline-danger"
				>Delete</button
			>
			<Link to="../">
				<button class="btn btn-outline-secondary">Back</button>
			</Link>
		</div>
	</div>
	<hr />
	<span style="white-space: pre-wrap; word-wrap: break-word;">
		{@html marked(note.content)}
	</span>
</div>
