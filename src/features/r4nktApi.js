import axios from 'axios'
require('dotenv').config({ path: '.env' })

const headers = {
  "Authorization": process.env.VUE_APP_R4NKT_API_TOKEN,
  "Accept": "application/json"
}

const apiEndPoint = process.env.VUE_APP_R4NKT_API_ENDPOINT
const gameId = process.env.VUE_APP_R4NKT_API_GAME_ID
const leaderBoardId = process.env.VUE_APP_R4NKT_API_LEADERBOARD_ID
const url = apiEndPoint + gameId 

const fetchData = async () => {
  axios.get(url + '/leaderboards/' + leaderBoardId + '/rankings', { headers })
  .then((response) => console.log(response.data.data))
  .catch(error => console.log(error.response))
}

const postData = (playerName, playerEmail, timedRemaining, matchesFound, numberOfFlips) => {
  console.log('Post Data to api =>', playerName, playerEmail, timedRemaining, matchesFound, numberOfFlips)
}

export default function r4nktApi() {
  return {
    fetchData,
    postData
  }
}