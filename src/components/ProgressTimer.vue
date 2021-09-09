<template>
	<div class="progress-wrapper">		
		<div class="progress">
			<h1 class="progress-text"></h1>
			<div class="progress-bar">
				<div data-progress="0" :style="`width:${timer}%`"></div>
			</div>
		</div>		
		<h2>{{ timer }}'s</h2> 		
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	setup () {
		let timer = ref(100)
		timer.value = 100

		const countDownTimer = () => {
			console.log("timer")
			let interval = setInterval(() => {
				if(timer.value > 0) {
					timer.value --
				} else {
					clearInterval(interval)
				}
			}, 1000);
		}

		return {
			timer,
			countDownTimer
		}
	},
	mounted () {
		this.countDownTimer();
	}
}
</script>

<style scoped>
h2 {
	color: #000f;	
}

.progress-wrapper {
	display: flex;
  justify-content: center;
  align-items: center;
}

.progress {
	max-width: 500px;
	width: 100%;	
}
.progress-text {
	opacity: 0;
	transition: opacity 0.3s;
}
.progress-text.is-active {
	opacity: 1;
}
.progress-bar {
	background-color: #5b4129;
	border-radius: 10px;
	height: 20px;
	position: relative;
	overflow: hidden;
	margin: 20px;
}
.progress [data-progress] {
	background-color: #91b454;
	border-radius: 10px;
	height: 100%;
	width: 0;
	line-height: 30px;
	position: absolute;
}
</style>