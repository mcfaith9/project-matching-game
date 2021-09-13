<template>
  <select class="select" @change="slectedDifficulty($event)">
    <option v-for="(difficulty, item) in mode.difficulties" :key="item" :value="difficulty">{{ difficulty }}</option>
  </select>
</template>

<script>
export default {
  setup () {
    return {
      mode: {
        difficulties: ["Easy","Medium","Difficult","Impossible"],
        emblem: ["easy","medium","difficult","impossible"]
      }
    }
  },
  methods: {
    slectedDifficulty(event) {
      console.log(event.target.value)
    }
  }
}
</script>

<style scoped>
.select {  
  color: white;
  padding: 8px 16px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #5b412a;
  padding-left: 55px;
  min-width: 160px;
  height: 50px;
  margin: 0 6px 0 6px;
  cursor: pointer;
  appearance: none;
  background: url(/images/arrow-down.svg) 96% / 15% no-repeat #5da832;
  background-position: 15% 50%;
}

.select:hover {
  color: white;
  background-color: #795548;
}

.select:focus-visible{
  outline: none;
}
</style>