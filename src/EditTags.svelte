<script>
	import storage from './helpers/storage';

	/** @type {Array} */
	export let notes;
	export let update;
	let tags = storage.get('tags');
	// notes[0].title = 'test'; // -- works
</script>

<div
	class="modal fade"
	id="editModal"
	tabindex="-1"
	aria-labelledby="editModal"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="editModalLabel">Edit Tags</h5>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
				/>
			</div>
			<div class="modal-body">
				<div class="d-flex vstack gap-2">
					{#each Object.entries(tags || {}) as [id, tag]}
						<div class="d-flex gap-1">
							<input
								on:input={(e) => {
									// @ts-ignore
									let txt = e.target.value;

									storage.update(
										'tags',
										(prev) => (prev[id] = txt),
										{}
									);
									update();
									notes = notes;
								}}
								class="form-control"
								value={tag}
							/>
							<button
								on:click={(e) => {
									storage.update(
										'tags',
										(prev) => delete prev[id],
										{}
									);
									update();
									notes.map((note) => {
										if (note.tags.includes(id)) {
											note.tags.splice(
												note.tags.indexOf(id),
												1
											);
										}
										storage.update(
											'notes',
											(nnotes) => {
												for (let i in nnotes) {
													const nnote = nnotes[i];
													if (nnote.id !== note.id)
														return;
													nnotes[i] = note;
												}
											},
											[]
										);
										// @ts-ignore
										e.target.parentElement.remove();
									});
								}}
								class="btn">&times;</button
							>
						</div>
					{:else}
						You have no tags.
					{/each}
				</div>
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-secondary"
					data-bs-dismiss="modal">Close</button
				>
			</div>
		</div>
	</div>
</div>
