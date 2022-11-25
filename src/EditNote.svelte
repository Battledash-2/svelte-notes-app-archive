<script>
	import { Link, navigate } from 'svroutes';
	import storage, { modify } from './helpers/storage';

	export let options;
	const { noteId } = options;

	const note = storage.search('notes', (n) => n.id === noteId, []);

	let content = note.content || '???';
	let title = note.title || '???';

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
						  }
						: n
				),
			[]
		);
		navigate('../../');
	}
</script>

<div class="w-100 p-3">
	<div class="mb-3 d-flex">
		<h2>Edit Note</h2>
		<div class="ms-auto">
			<button on:click={click} class="btn btn-primary">Save</button>
			<!-- <button class="btn btn-outline-danger">Delete</button> -->
			<Link to="../../">
				<button class="btn btn-outline-secondary">Cancel</button>
			</Link>
		</div>
	</div>
	<input
		bind:value={title}
		class="form-control w-100 mb-2"
		placeholder="Title"
	/>
	<textarea
		bind:value={content}
		class="form-control w-100"
		style="height: 50vh"
		placeholder="Type your note here! This supports markdown."
	/>
</div>
