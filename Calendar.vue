<template>
	<div class='calendar-wrapper'>
		<header class="date-header-wrapper">
			<span class="switch left" @click="prevMonth"></span>
			<span class="current-date-wrapper">{{currentYear}}年{{(Number(currentMouth + 1) > 9 ? '':'0') + (currentMouth + 1)}}月{{(Number(currentDay) > 9 ? '':'0')+currentDay}}日</span>
			<span class="switch right" @click="nextMonth"></span>
		</header>

		<section class="week-wrapper">
			<span>周日</span>
			<span>周一</span>
			<span>周二</span>
			<span>周三</span>
			<span>周四</span>
			<span>周五</span>
			<span>周六</span>
		</section>

		<main class="calendar-container-wrapper">
			<!-- 上个月 -->
			<span class="prev-item" v-for="(item,i) in prevDateColle" :key="'prev' + i" @click="prevCheckDate(item)">{{item}}</span>
			<!-- 当前月 -->
			<span class="cret-item" :class="{'is-check':item === currentDay}" v-for="(item,i) in cretDateColle" :key="'cret' + i" @click="cretCheckDate(item)">{{item}}</span>
			<!-- 下个月 -->
			<span class="next-item" v-for="(item,i) in nextDateColle" :key="'next' +i" @click="nextCheckDate(item)">{{item}}</span>
		</main>
	</div>
</template>

<script>
// 简单的日历组件
export default {
	name: 'Calendar',
	data() {
		return {
			currentYear: 0,
			currentMouth: 0,
			currentDay: 1,
			prevDateColle: [],
			cretDateColle: 0,
			nextDateColle: [],
		};
	},
	async created() {
		const time = await this.initGetCurrentDate();
		this.renderCalendar(time);
	},
	mounted() {},
	methods: {
		initGetCurrentDate() {
			return new Promise((resolve) => {
				const date = new Date();
				const year = date.getFullYear();
				const mouth = date.getMonth();
				const day = date.getDate();

				this.currentYear = year;
				this.currentMouth = mouth;
				this.currentDay = day;

				resolve([year, mouth]);
			});
		},
		// 获取上个月份显示天数
		getPrevMonthDays([year, mouth]) {
			const cretMonthDate = new Date(year, mouth, 1);
			const week = cretMonthDate.getDay();

			if (mouth === 0) {
				mouth = 11;
				year -= 1;
			} else {
				mouth -= 1;
			}

			const prevMonthDate = new Date(year, mouth + 1, 0);
			const days = prevMonthDate.getDate();
			const arr = [];

			for (let i = week - 1; i >= 0; i--) {
				arr.push(days - i);
			}

			this.prevDateColle = arr;
		},
		// 获取当前月份显示天数
		getCretMonthDays([year, mouth]) {
			const date = new Date(year, mouth + 1, 0);
			const days = date.getDate();

			this.cretDateColle = days;
		},
		// 获取下个月份显示天数
		getNextMonthDays([year, mouth]) {
			const date = new Date(year, mouth + 1, 0);
			const days = date.getDate();
			const time = new Date(year, mouth, days);
			const week = time.getDay();
			const arr = [];

			for (let i = 1; i <= 6 - week; i++) {
				arr.push(i);
			}

			this.nextDateColle = arr;
		},
		renderCalendar(arr) {
			this.getPrevMonthDays(arr);
			this.getCretMonthDays(arr);
			this.getNextMonthDays(arr);
		},
		prevMonth() {
			let year = this.currentYear;
			let month = this.currentMouth;
			if (month === 0) {
				year -= 1;
				month = 11;
			} else {
				month -= 1;
			}

			this.currentYear = year;
			this.currentMouth = month;
			this.currentDay = 1;
			this.renderCalendar([year, month]);
		},
		nextMonth() {
			let month = this.currentMouth;
			let year = this.currentYear;

			if (month === 11) {
				year += 1;
				month = 0;
			} else {
				month += 1;
			}

			this.currentYear = year;
			this.currentMouth = month;
			this.currentDay = 1;
			this.renderCalendar([this.currentYear, this.currentMouth]);
		},
		prevCheckDate(v) {
			this.currentDay = v;

			if (this.currentMouth === 0) {
				this.currentYear -= 1;
			}
			this.currentMouth -= 1;
			this.renderCalendar([this.currentYear, this.currentMouth]);
		},
		cretCheckDate(v) {
			this.currentDay = v;
		},
		nextCheckDate(v) {
			this.currentDay = v;

			if (this.currentMouth === 11) {
				this.currentYear += 1;
				this.currentMouth = 0;
			} else {
				this.currentMouth += 1;
			}
			this.renderCalendar([this.currentYear, this.currentMouth]);
		},
	},
};
</script>

<style scoped lang='css'>
.calendar-wrapper {
	width: 680px;
	height: 538px;
	padding: 0 60px;
	box-sizing: border-box;
	margin: 50px auto;
	border-radius: 10px;
	box-shadow: rgb(148 163 184 / 20%) 0px 16px 36px 0px;
}

.date-header-wrapper {
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgba(15, 23, 42, 0.65);
}

.date-header-wrapper .current-date-wrapper {
	width: 130px;
	text-align: center;
	margin: 0 100px;
	font-size: 18px;
}

.date-header-wrapper .switch {
	width: 20px;
	height: 20px;
	cursor: pointer;
	background: no-repeat center/14px;
}

.date-header-wrapper .switch.left {
	background-image: url('./images/arrow-left.svg');
}

.date-header-wrapper .switch.right {
	background-image: url('./images/arrow-right.svg');
}

.week-wrapper {
	display: flex;
	justify-content: space-between;
	color: rgba(15, 23, 42, 0.45);
}

.calendar-container-wrapper {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	color: rgba(15, 23, 42, 0.85);
	font-size: 18px;
}

.week-wrapper span {
	width: 14%;
	height: 30px;
	line-height: 30px;
	margin: 5px 14px;
	text-align: center;
}

.calendar-container-wrapper span {
	width: 48px;
	height: 48px;
	line-height: 48px;
	text-align: center;
	margin: 14px;
	border-radius: 50%;
	cursor: pointer;
	font-weight: 600;
}

.prev-item,
.next-item {
	color: rgba(15, 23, 42, 0.45);
}

.is-check {
	background-color: #3b82f6;
	color: #fff;
}

.calendar-container-wrapper span:not(.is-check):hover {
	background-color: #eff6ff;
}
</style>
