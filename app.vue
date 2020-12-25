<template>
	<div>
		<input type="file" @change="upload($event)">

		<Pager :total="13"></Pager>
	</div>
</template>

<script>
function toBuffer(file = {}, fz) {
	const { name = '', size = 0 } = file;
	const n = Math.ceil(size / fz);
	const a = new Array(n).fill(null);
	const buffer = a.map((e, i) => file.slice(i * fz, (i + 1) * fz));

	return { buffer, name };
}

function toBety(size) {
	let c = 0;
	let num = size;
	const bety = ['B', 'KB', 'MB', 'GB', 'TB'];

	while (num >= 1024) {
		num /= 1024;
		c++;
	}

	return num.toFixed(2) + bety[c];
}

import Pager from './components/pager';

export default {
	name: 'app',
	components: { Pager },
	data() {
		return {
			questions: {},
		};
	},
	methods: {
		upload(e) {
			const [file] = e.target.files;
			if (!file) return;
			const fz = 1024 * 1024 * 4;
			const { buffer, name } = toBuffer(file, fz);
			const bf = new File(buffer, name);
			console.log(toBety(bf.size), buffer);
		},
	},
	created() {
		console.log();
	},
};
</script>

<style>
</style>