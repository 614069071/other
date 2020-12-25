<template>
	<!-- 分页器 -->
	<div class="pager-view-wrapper">
		<div class="pager-btn" @click="switchPage(1)">&lt;</div>
		<span class="pager-item" :class="{active:current === item}" v-for="(item,index) in cache" :key="index" @click="checked(item)">{{item + addPage}}</span>
		<div class="pager-btn" @click="switchPage(0)">&gt;</div>
	</div>
</template>

<script>
export default {
	name: 'pager',
	props: {
		total: {
			type: Number,
		},
		size: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			step: 5,
			cache: 0,
			current: 1,
			addPage: 0,
		};
	},
	created() {
		console.log(this.total);
		const num = Math.ceil(this.total / this.size);
		this.cache = num >= this.step ? this.step : num;
		console.log(num);
	},
	methods: {
		switchPage(type) {
			if (type) {
				if (this.current <= 1) {
					if (this.addPage) {
						this.addPage--;
					}
				} else {
					this.current--;
				}
			} else {
				if (this.current >= this.cache) {
					const num = Math.ceil(this.total / this.size);
					if (this.addPage >= num - this.step) return;
					this.addPage++;
				} else {
					this.current++;
				}
			}

			const currentPage = this.current + this.addPage;

			console.log(currentPage);
		},
		checked(item) {
			this.current = item;
		},
	},
};
</script>

<style>
.pager-view-wrapper {
	display: flex;
}

.pager-btn,
.pager-item {
	height: 30px;
	line-height: 30px;
	width: 30px;
	text-align: center;
	font-size: 14px;
	color: #606266;
	background-color: #f4f4f5;
	border-radius: 2px;
	margin: 0 5px;
	cursor: pointer;
	user-select: none;
}

.pager-item.active {
	color: #409eff;
}
</style>