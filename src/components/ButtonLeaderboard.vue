<template>
  <button :class="$style.button">
    <img src="/images/star-medal.svg" alt="Leaderboard Icon" class="img-leaderboard"/>Leaderboard
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
  font-size: 1rem;
  border: 0;
  border-radius: 10px;
  transition: 0.2s all ease-in;
  border: 2px solid #5b412a;
  min-width: 160px;
  height: 50px;
}

.button:hover {
  color: white;
  background-color: #795548;
}

.button img {
  padding-right: 12px;
  transition: 0.2s opacity ease-in;
}

.button-icon {
  position: relative;
  width: 24px;
  height: 24px;
}
</style>