import Swal from 'sweetalert2'
import createScore from './createScore'


const field = `<input type="text" id="playername" class="swal2-input" placeholder="Player Name"><input type="text" id="playeremailaddress" class="swal2-input" placeholder="Player Email Address">`
const { playerInfo } = createScore()

const askPlayerInfo = () => {
	Swal.fire({
		title: 'Please Input your Info',
		backdrop: ` rgba(0,0,0,.7) `,
		customClass: 'swal-ask-player-info',
		html: field,
		focusConfirm: false,
		allowOutsideClick: false,
		confirmButtonText: 'ENTER',
		preConfirm: () => {
			const name = Swal.getPopup().querySelector('#playername').value
			const email = Swal.getPopup().querySelector('#playeremailaddress').value
			if (!name || !email) {
				Swal.showValidationMessage(`Opps some field are empty`)
			}

			return { name: name, email: email }
			}
	}).then((result) => {
		passPlayerInfo(result.value.name, result.value.email)
	})
}

const passPlayerInfo = (name, email) => {
	playerInfo(name, email)
}

export default function createUserData() {
	return {
		askPlayerInfo,
		passPlayerInfo
	}
}