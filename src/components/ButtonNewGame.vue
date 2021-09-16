<script>
export default {
  props: {
    newPlayer: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const startNewGame = () => {
      ctx.emit('start-new-game')
    }

    return {
      startNewGame
    }
  }
}
</script>

<template>
  <button v-if="newPlayer" @click="startNewGame" class="button">
    <div class="button-icon">
      <img
        class="icon-play"
        src="/images/play-button.svg"
        alt="Play Icon"
      />
    </div>
    Start Game
  </button>
  <button v-else @click="startNewGame" class="button">
    <img class="img-restart-button" src="/images/restart.svg" alt="Restart Icon" />Restart Game
  </button>
</template>
