<script>
import { ref, watch } from 'vue'
import { launchConfetti } from '@/utilities/confetti'
import createDeck from '@/features/createDeck'
import createGame from '@/features/createGame'
import createScore from '@/features/createScore'
import progressTimer from '@/features/createProgressTimer'
import createPlayerData from '@/features/createPlayerData'

import aguyiknowpeople from '@/data/aguyiknowpeople.json'

import AppHero from '@/components/AppHero'
import AppProgressTimer from '@/components/AppProgressTimer'
import AppFooter from '@/components/AppFooter'
import AppSelectBox from '@/components/AppSelectBox'
import AppSettings from '@/components/AppSettings'
import GameBoard from '@/components/GameBoard'
import ButtonNewGame from '@/components/ButtonNewGame'
import ButtonLeaderboard from '@/components/ButtonLeaderboard'

export default {
  name: 'App',
  components: {
    AppHero,
    AppProgressTimer,   
    AppFooter,
    AppSelectBox,
    AppSettings,
    GameBoard,
    ButtonNewGame,
    ButtonLeaderboard
  },
  setup() {
    const { askPlayerInfo } = createPlayerData()    
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
      if (currentValue != 8) return
        launchConfetti()
        stopTimer()
        score(timer.value, flips.value, status)       
    })

    watch(timer, currentValue => {
      if(currentValue > 35) return
        almostTimeout.value = false
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
      askPlayerInfo,
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
