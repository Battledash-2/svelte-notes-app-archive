<script>
	import { Link } from 'svroutes';
	import storage from './helpers/storage';
	import './styles/Dashboard.css';

	const notes = storage.get('notes', []);
	let viewNotes = notes.filter(() => true);

	let title = '';
	$: viewNotes = notes.filter((note) =>
		note.title.toLowerCase().includes(title.toLowerCase())
	);
</script>

<!-- <div class="d-flex ms-auto">
			<Link to="/new">
				<button class="btn btn-primary">New Note</button>
			</Link>
		</div> -->

<div class="w-100 p-3">
	<div class="d-flex">
		<h2>Notes</h2>
		<div class="ms-auto">
			<Link to="./new">
				<button class="btn btn-primary">New Note</button>
			</Link>
		</div>
	</div>
	<hr />
	<div class="form mb-3">
		<input
			bind:value={title}
			placeholder="Search by Title"
			class="form-control"
		/>
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
						</div>
					</div>
				</Link>
			{:else}
				<h6>Woops! Nothing here.</h6>
			{/each}
		</div>
	</div>
</div>
