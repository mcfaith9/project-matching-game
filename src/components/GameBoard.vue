<script>
import Swal from 'sweetalert2'
import Card from './GameCard'

export default {
  emits: ['flipCard','flip-card'],
  components: {
    Card
  },
  props: {
    cardList: {
      type: Array,
      required: true
    },
    status: {
      type: Number,
      required: true
    },
    flips: {
      type: Number,
      required: true
    },
    readyState: {
      type: Boolean,
      required: false
    }
  },
  setup(props, ctx) {
    const selectCard = payload => {  
      if(!props.readyState) {
        Swal.fire({
          title: 'Please Start Game',
          customClass: 'swal-warning',
          focusConfirm: false,
        })
      } 

      if(props.readyState) {
        ctx.emit('flip-card', payload)
      }  
    }

    return {
      selectCard
    }
  }
}
</script>

<template>
  <transition-group tag="section" class="game-board" name="shuffle-card">
    <Card
      v-for="card in cardList"
      :key="`${card.value}-${card.variant}`"
      :matched="card.matched"
      :value="card.value"
      :visible="card.visible"
      :position="card.position"
      @select-card="selectCard"
    />
  </transition-group>
  <div class="status-wrapper">
    <h2 class="status">Matches found: {{ status }}</h2> 
    <h2 class="status">Number of Flips: <span>{{ flips }}</span></h2>
  </div>
</template>
