import { ref } from 'vue'
import Swal from 'sweetalert2'

const timer = ref(100)
let interval

const countDownTimer = (state) => {
	console.log(state)

	clearInterval(interval)
	timer.value = 100	
		interval = setInterval(() => {	
		if(timer.value > 0) {
			timer.value --
		} else {	
			clearInterval(interval)	
			Swal.fire({
				title: "Game Over",				
				background: '#fff url(/images/nether-brick-minecraft.png)',
				backdrop: ` url("/images/gif/fallen.gif") rgba(0,0,0,0.7) center center fixed `,
				text: "You runout of time Better luck next time!",
				focusConfirm: false,
				allowOutsideClick: false,
				confirmButtonText: 'OK'				
			})		
		}
	}, 1000);
}

const stopTimer = () => {
	clearInterval(interval)
}

export default function progressTimer() {
  return {
    timer,
    countDownTimer,
    stopTimer
  }
}