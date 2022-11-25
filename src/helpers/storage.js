export function get(key, initial) {
	let data = localStorage.getItem(key);
	if (data == null) {
		if (typeof initial === 'function') {
			return initial();
		} else {
			return initial;
		}
	} else {
		try {
			return JSON.parse(data);
		} catch {
			return data;
		}
	}
}

export function set(key, value) {
	localStorage.setItem(key, value);
}

export function update(key, callback, initial) {
	const item = get(key, initial);
	const r = callback(item);
	try {
		set(key, JSON.stringify(item));
	} catch {
		set(key, item);
	}
	return r;
}

export function modify(key, callback, initial) {
	const item = get(key, initial);
	const r = callback(item);
	try {
		set(key, JSON.stringify(r));
	} catch {
		set(key, r);
	}
	return item;
}

export function search(key, callback, initial) {
	const item = get(key, initial);
	return item.filter(callback)[0];
}

export default {
	get,
	set,
	update,
	search,
	modify,
};
