<script>
	import { Link, navigate } from 'svroutes';
	import { update } from './helpers/storage';
	import { v4 } from 'uuid';

	let content = '';
	let title = '';

	function click() {
		update(
			'notes',
			(prev) =>
				prev.push({
					id: v4(),
					title,
					content,
				}),
			[]
		);
		navigate('/');
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
