<script>
	import { Link, navigate } from 'svroutes';
	import storage, { modify } from './helpers/storage';
	import { marked } from 'marked';

	export let options;
	const { noteId } = options;

	const note = storage.search('notes', (n) => n.id == noteId, []);

	function deleteNote() {
		modify('notes', (prev) => prev.filter((n) => n.id !== noteId), []);
		navigate('../');
	}
</script>

<div class="w-100 p-3">
	<div class="mb-3 d-flex">
		<h2>{note.title}</h2>
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
