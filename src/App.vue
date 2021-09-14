<script>
import { ref, watch } from 'vue'
import { launchConfetti } from './utilities/confetti'
import createDeck from './features/createDeck'
import createGame from './features/createGame'
import createScore from './features/createScore'
import progressTimer from './features/createProgressTimer'
import createPlayerData from './features/createPlayerData'
import r4nktApi from './features/r4nktApi'

import aguyiknowpeople from './data/aguyiknowpeople.json'

import AppProgressTimer from './components/AppProgressTimer'
import AppFooter from './components/AppFooter'
import AppHero from './components/AppHero'
import AppSelectBox from './components/AppSelectBox'
import AppSettings from './components/AppSettings'
import GameBoard from './components/GameBoard'
import ButtonNewGame from './components/ButtonNewGame'
import ButtonLeaderboard from './components/ButtonLeaderboard'

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHero,
    GameBoard,
    ButtonNewGame,
    AppProgressTimer,
    ButtonLeaderboard,
    AppSelectBox,
    AppSettings
  },
  setup() {
    const { askPlayerInfo } = createPlayerData()
    const { fetchData } = r4nktApi()
    const { timer, countDownTimer, stopTimer } = progressTimer()
    const { score } = createScore()
    const { cardList } = createDeck(aguyiknowpeople)
    const {
      newPlayer,
      startGame,
      restartGame,
      matchesFound,
      status
    } = createGame(cardList)
    const userSelection = ref([])
    const userCanFlipCard = ref(true)
    const almostTimeout = ref(true)    
    const flips = ref(0)
    const readyState = ref(false)

    const startNewGame = () => {  
      countDownTimer(newPlayer.value) 
      readyState.value = true
      // fetchData()  
      if (newPlayer) {         
        startGame()
      } else {
        restartGame()
      }
    }

    const flipCard = payload => {
      if (userCanFlipCard.value) {
        cardList.value[payload.position].visible = true

        if (userSelection.value[0]) {
          if (userSelection.value[0].position === payload.position &&
            userSelection.value[0].faceValue === payload.faceValue) {
            return
          } else {
            userSelection.value[1] = payload
          }
        } else {
          userSelection.value[0] = payload
        }
      } else {
        return
      }
    }

    watch(matchesFound, currentValue => {
      if (currentValue === 8) {
        launchConfetti()
        stopTimer()
        score(timer.value, flips.value, status)
      }
    })

    watch(timer, currentValue => {
      if(currentValue === 35) {
        almostTimeout.value = false
      }
    })

    watch(
      userSelection,
      currentValue => {
        if (currentValue.length === 2) {            
          const cardOne = currentValue[0]
          const cardTwo = currentValue[1]

          // Disable ability to flip cards
          userCanFlipCard.value = false
          flips.value ++

          if (cardOne.faceValue === cardTwo.faceValue) {
            cardList.value[cardOne.position].matched = true
            cardList.value[cardTwo.position].matched = true
            userCanFlipCard.value = true
          } else {
            setTimeout(() => {
              cardList.value[cardOne.position].visible = false
              cardList.value[cardTwo.position].visible = false
              // Allow user to flip a new card
              userCanFlipCard.value = true
            }, 1000)
          }

          userSelection.value.length = 0
        }
      },
      { deep: true }
    )

    return {
      cardList,
      flipCard,
      userSelection,
      status,
      startNewGame,
      readyState,
      newPlayer,
      flips,
      timer,
      almostTimeout,
      fetchData,
      askPlayerInfo
    }
  },
  mounted() {
    this.askPlayerInfo()
  }
}
</script>

<template>
  <AppHero />    
  <AppProgressTimer :timer="timer" :almostTimeout="almostTimeout"/>
  <GameBoard :cardList="cardList" :status="status" :flips="flips" :readyState="readyState" @flip-card="flipCard" />
  <div class="button-wrapper">
    <AppSelectBox /> 
    <ButtonNewGame :newPlayer="newPlayer" @start-new-game="startNewGame" />
    <ButtonLeaderboard />    
  </div>
  <AppFooter />
  <AppSettings />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');

*, *::before, *::after {
  padding: 0;  
  font-family: 'Titillium Web', sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

html {
  background-image: url('/images/background-minecraft.jpg');
  background-repeat:no-repeat;
  background-size:cover
}

h1 {
  margin-top: 0;
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  padding: 30px 0 0;
}

.status {
  font-family: 'Titillium Web', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(4, 60px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  justify-content: center;
}

.button-wrapper {
  display: inline-flex
}
.button-wrapper button {  
  margin: 0 6px 30px;
}

@media screen and (min-width: 500px) {
  .game-board {
    grid-template-columns: repeat(4, 90px);
    grid-template-rows: repeat(4, 90px);
  }
}

@media screen and (min-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 120px);
    grid-template-rows: repeat(4, 120px);
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.shuffle-card-move {
  transition: transform 0.8s ease-in;
}
.title {
  width: 10%;
}

.img-leaderboard, .img-restart-button{
  width: 3vh;
}

.swal2-title {
  margin: 0 !important;
  color: #f3f3f3 !important;
  letter-spacing: 2px !important;
  font-size: 4rem !important;  
  font-family: 'Bangers', sans-serif !important;
  background-size: cover !important; 
  -webkit-border-radius: 10px 10px 0 0 !important;
  -moz-border-radius: 10px 10px 0 0 !important;
  border-radius: 10px 10px 0 0 !important;
}

.swal-game-win > .swal2-title {
  font-size: 4rem !important;
}

.swal-game-win, .swal-ask-player-info {
  background: url(/images/dirt-minectaft.jpg);
}

.swal-game-win > .swal2-html-container > ul > li{  
  font-family: 'Bangers', sans-serif !important;
}

.swal-ask-player-info > .swal2-title {
  letter-spacing: 3px !important;
  font-size: 2.6rem !important;
  color: #f3f3f3 !important;
}

.swal-ask-player-info > .swal2-html-container {
  font-size: 20px !important;
  color: #f3f3f3 !important;
  padding: 10px;
}

.swal-ask-player-info > .swal2-actions > button {
  border: 2px solid #5b412a !important;
}

.swal-warning {
  background: none !important;
}

.swal2-popup {
  border-radius: 15px !important;
}

.swal2-styled.swal2-confirm {
  background-color: #5da832 !important;
  color: #f3f3f3 !important;
  padding: 8px 16px 10px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-weight: bold !important;
  font-size: 1rem !important;
  border: 0 !important;
  border-radius: 10px !important;
  transition: 0.2s all ease-in !important;
  border: 2px solid #5b412a !important;
  min-width: 160px !important;
  height: 50px !important;
}

.swal2-styled.swal2-confirm:hover {
  color: #f3f3f3;
  background-color: #795548 !important;
}

.swal2-container.swal2-backdrop-show, .swal2-container.swal2-noanimation {
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.swal2-html-container {
  color: #f3f3f3 !important;
  font-size: 40px;
  font-family: 'Bangers', sans-serif !important;
}
</style>
