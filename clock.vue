<template>
	<div class='clock-view-wrapper'>
		<div class="secounds" :style="{transform:`translate(-50%, -50%) rotate(${secoundCount}deg)`}">
			<span class="secound-item" :class="{active:Math.abs(secoundCount % 360) === Math.abs(6 * i)}" :style="{transform:`translate(-50%, -50%) rotate(${6 * i}deg)`}" v-for="(item,i) in 60" :key="item">{{`${i >= 10 ? "":"0"}` + i}}秒</span>
		</div>
		<div class="minutes" :style="{transform:`translate(-50%, -50%) rotate(${minuteCount}deg)`}">
			<span class="minute-item" :class="{active:Math.abs(minuteCount % 360) === Math.abs(6 * i)}" :style="{transform:`translate(-50%, -50%) rotate(${6 * i}deg)`}" v-for="(item,i) in 60" :key="item">{{`${i >= 10 ? "":"0"}` + i}}分</span>
		</div>
		<div class="hours" :style="{transform:`translate(-50%, -50%) rotate(${hourCount}deg)`}">
			<span class="hour-item" :class="{active:Math.abs(hourCount % 360) === Math.abs(15 * i)}" :style="{transform:`translate(-50%, -50%) rotate(${15 * i}deg)`}" v-for="(item,i) in 24" :key="item">{{`${i >= 10 ? "":"0"}` + i}}时</span>
		</div>
		<div class="days" :style="{transform:`translate(-50%, -50%) rotate(${dayCount}deg)`}">
			<span class="day-item" :class="{active:Math.abs(dayCount % 360) === Math.abs((360 / currentMonths) * item)}" :style="{transform:`translate(-50%, -50%) rotate(${(360 / currentMonths) * item}deg)`}" v-for="(item) in currentMonths" :key="item">{{`${item >= 10 ? "":"0"}` + item}}日</span>
		</div>
		<div class="months" :style="{transform:`translate(-50%, -50%) rotate(${monthCount}deg)`}">
			<span class="mouth-item" :class="{active:Math.abs(monthCount % 360) === Math.abs(30 * i)}" :style="{transform:`translate(-50%, -50%) rotate(${30 * i}deg)`}" v-for="(item,i) in 12" :key="item">{{`${item >= 10 ? "":"0"}` + item}}月</span>
		</div>
		<div class="year" :style="{transform:`translate(-50%, -50%)`}"><span class="active">{{year}}年</span></div>
	</div>
</template>

<script>
export default {
	name: 'clock',
	data() {
		return {
			timer: null,
			secoundCount: 0,
			minuteCount: 0,
			hourCount: 0,
			dayCount: 0,
			monthCount: 0,
			year: 0,
			currentMonths: 31,
		};
	},
	created() {
		console.log('created');
	},
	async mounted() {
		await this.initTime();
		this.move();
	},
	methods: {
		initTime() {
			return new Promise((resolve) => {
				const date = new Date();
				const secound = date.getSeconds();
				const minute = date.getMinutes();
				const hour = date.getHours();
				const day = date.getDate();
				const mouth = date.getMonth();
				const year = date.getFullYear();

				this.currentMonths = new Date(year, mouth + 1, 0).getDate();
				this.secoundCount = secound * -6;
				this.minuteCount = minute * -6;
				this.hourCount = hour * -15;
				this.dayCount = day * -(360 / this.currentMonths);
				this.monthCount = mouth * -30;
				this.year = year;
				resolve();
			});
		},
		move() {
			this.timer = setInterval(() => {
				this.secoundCount -= 6;

				if (!Math.abs(this.secoundCount % 360)) {
					this.minuteCount -= 6;
				}

				if (!Math.abs(this.minuteCount % 360)) {
					this.hourCount -= 15;
				}

				if (!Math.abs(this.hourCount % 360)) {
					this.dayCount -= 360 / this.currentMonths;
				}

				if (!Math.abs(this.dayCount % 360)) {
					this.monthCount -= 30;
				}
			}, 1000);
		},
	},
};
</script>

<style lang='css'>
body {
	background-color: #000;
}
.clock-view-wrapper {
	position: relative;
	width: 750px;
	height: 750px;
	color: grey;
	overflow: hidden;
}

.year,
.secounds,
.minutes,
.hours,
.days,
.months {
	position: absolute;
	left: 50%;
	top: 50%;
	transition: transform 1s;
}

.secounds {
	width: 750px;
	height: 750px;
}

.minutes {
	width: 610px;
	height: 610px;
}

.hours {
	width: 480px;
	height: 480px;
}

.days {
	width: 350px;
	height: 350px;
}

.months {
	width: 220px;
	height: 220px;
}

.minute-item,
.secound-item,
.hour-item,
.day-item,
.mouth-item {
	width: 100%;
	height: 20px;
	line-height: 20px;
	position: absolute;
	left: 50%;
	top: 50%;
	text-align: right;
}

.clock-view-wrapper > div > span.active {
	color: #fff;
}
</style>
