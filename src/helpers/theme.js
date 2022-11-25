import { writable } from 'svelte/store';
import storage from './storage';

// false = light
// true = dark

export const Theme = writable(false);

let ls = storage.get('theme', 'false');
Theme.set(ls);

export function setTheme(bool) {
	// @ts-ignore
	Theme.set(bool);
	storage.set('theme', bool.toString());
}
