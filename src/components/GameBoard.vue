<script>
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
    }
  },
  setup(props, ctx) {
    const selectCard = payload => {
      ctx.emit('flip-card', payload)
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

<style scoped>
h2 {
  color:  #000;
}
.status-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-wrapper h2 {
  margin-right: 20px;
}
</style>
