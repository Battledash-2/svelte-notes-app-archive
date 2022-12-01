// @ts-ignore
import App from './App.svelte';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';

const app = new App({
	target: document.getElementById('app'),
});

export default app;
