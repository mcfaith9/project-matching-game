import { ref } from 'vue'
import Swal from 'sweetalert2'

const timer = ref(100)
let interval
const countDownTimer = () => {
	interval = setInterval(() => {
		if(timer.value > 0) {
			timer.value --
		} else {		
			Swal.fire({
				title: "Game Over",
				text: "You runout of time Better luck next time!",
				allowOutsideClick: false,
				buttons: {
					confirm: {
						text: "OK",
						value: true,
						visible: true,
						className: "",
						closeModal: true
					},
				}
			})
			clearInterval(interval)
		}
	}, 1000);
}

const stopTimer = () => {
	clearInterval(interval);
}

export default function progressTimer() {
  return {
    timer,
    countDownTimer,
    stopTimer
  }
}