<script>
	// @ts-nocheck

	import { Route, Router } from 'svroutes';
	import CreateNote from './CreateNote.svelte';
	import Dashboard from './Dashboard.svelte';
	import EditNote from './EditNote.svelte';
	import { setTheme, Theme } from './helpers/theme';
	import ViewNote from './ViewNote.svelte';

	import './styles/App.css';

	function switchTheme() {
		if ($Theme == true) setTheme(false);
		else setTheme(true);
		updateTheme();
	}

	function updateTheme() {
		if ($Theme) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	updateTheme();
</script>

<Router>
	<div class="container py-4 px-3 mx-auto">
		<Route path="/new" component={CreateNote} />
		<Route path="/view/:noteId" component={ViewNote} />
		<Route path="/edit/:noteId" component={EditNote} />

		<Route index component={Dashboard} />
	</div>
	<button
		style={`
			position: absolute;
			right: 2rem;
			bottom: 2rem;
		`}
		class="btn btn-primary"
		on:click={switchTheme}>Theme</button
	>
</Router>
