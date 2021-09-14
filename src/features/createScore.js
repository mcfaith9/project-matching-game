import { ref } from 'vue'
import Swal from 'sweetalert2'
import r4nktApi from './r4nktApi'

const { postData } = r4nktApi()
const playerName = ref()
const playerEmail = ref()

const playerInfo = (name, email) => {
  playerName.value = name
  playerEmail.value = email
  console.log(name, email)
}

const score = (timedRemaining, numberOfFlips, matchesFound) => {
    Swal.fire({
      title: 'You Win!',
      customClass: 'swal-game-win',
      backdrop: ` rgba(0,0,0,.2) `,
      html: `<ul>
        <li> Time Reamining: ${ timedRemaining } </li>
        <li> Match Found: ${ matchesFound.value } </li>
        <li> Number of Flips: ${ numberOfFlips } </li>            
        </ul>`,
      focusConfirm: false,
      allowOutsideClick: false,
      confirmButtonText: 'SUBMIT SCORE'
    })
    .then((result) => {
      if (!result.isConfirmed) return
        postData(playerName.value, playerEmail.value, timedRemaining, matchesFound.value, numberOfFlips)
        Swal.fire({          
          icon: 'success',
          customClass: 'swal-game-win',
          text: 'Score Successfuly Submited'
        })
    })  
}

export default function scoring() {
  return {
    score,
    postData,
    playerInfo
  }
}