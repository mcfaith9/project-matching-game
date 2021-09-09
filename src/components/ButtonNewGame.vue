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
  <button v-if="newPlayer" @click="startNewGame" :class="$style.button">
    <div :class="$style['button-icon']">
      <img
        :class="$style['icon-play']"
        src="/images/play-button.svg"
        alt="Play Icon"
      />
    </div>
    Start Game
  </button>
  <button v-else @click="startNewGame" :class="$style.button">
    <img class="img-restart-button" src="/images/restart.svg" alt="Restart Icon" />Restart Game
  </button>
</template>

<style module>
.button {
  background-color: #5da832;
  color: white;
  padding: 8px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-family: 'Titillium Web', sans-serif;
  font-weight: bold;
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #5b412a;
  min-width: 160px;
}

.button:hover {
  color: white;
  background-color: #795548;
}

.button img {
  padding-right: 12px;
  transition: 0.2s opacity ease-in;
}

.button .icon-aguyiknow {
  position: absolute;
  left: -6px;
  width: 100%;
  opacity: 0;
}

.button .icon-play {
  position: absolute;
  left: -6px;
  opacity: 1;
  width: 100%;
}

.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
}
</style>
