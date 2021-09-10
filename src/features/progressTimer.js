import { ref } from 'vue'

const timer = ref(100)

const countDownTimer = () => {
	timer.value = 100	
	const interval = setInterval(() => {
		if(timer.value > 0) {
			timer.value --
		} else {
			clearInterval(interval)
		}
	}, 1000);
}


export default function progressTimer() {
  return {
    timer,
    countDownTimer
  }
}