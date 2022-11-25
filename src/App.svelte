<script>
	// @ts-nocheck

	import { Route, Router } from 'svroutes';
	import CreateNote from './CreateNote.svelte';
	import Dashboard from './Dashboard.svelte';
	import EditNote from './EditNote.svelte';
	import ViewNote from './ViewNote.svelte';
</script>

<Router>
	<div class="container py-4 px-3 mx-auto">
		<Route path="*/new" component={CreateNote} />
		<Route path="*/view/:noteId" component={ViewNote} />
		<Route path="*/edit/:noteId" component={EditNote} />

		<Route index component={Dashboard} />
	</div>
</Router>
