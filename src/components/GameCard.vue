<script>
import { computed } from 'vue'

export default {
  props: {
    matched: {
      type: Boolean,
      default: false
    },
    position: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const flippedStyles = computed(() => {
      if (props.visible) {
        return 'is-flipped'
      } else {
        return null;
      }       
    })

    const selectCard = () => {
      if(props.visible) return
        
        context.emit('select-card', {
          position: props.position,
          faceValue: props.value
        })      
    }

    return {
      flippedStyles,
      selectCard
    }
  }
}
</script>

<template>
  <div class="card" :class="flippedStyles" @click="selectCard">
    <div class="card-face is-front">
      <img
        class="card-image"
        :srcset="`/images/aguyiknowpips/${value}@2x.png 2x, /images/aguyiknowpips/${value}.png 1x`"
        :src="`/images/aguyiknowpips/${value}.png`"
        :alt="value"
      />
      <img v-if="matched" src="/images/checkmark.svg" class="icon-checkmark" />
    </div>
    <div class="card-face is-back"></div>
  </div>
</template>

<style>
.card {
  position: relative;
  transition: 0.5s transform ease-in;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
}

.card-face.is-front {
  color: white;
  transform: rotateY(180deg);
}

.card-face.is-back {
  background-image: url('/images/back-card-minecraft.png');
  background-size: 120px 120px;
  color: white;
}

.card-image {
  max-width: 96%;
  border-radius: 10px;
  border: 4px solid #5e3f2b;
}

.icon-checkmark {
  position: absolute;
  right: 5px;
  bottom: 5px;
}
</style>
