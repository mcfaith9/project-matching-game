<script>
	export default {
		methods: {
			settings() {
				alert('this is settings to be implemented')
			}
		}
	}
</script>

<template>
	<div class="settings-wrapper" @click="settings()">
		<img src="/images/cog.svg">
	</div>
</template>

<style type="text/css" scoped>
.settings-wrapper {
  position: fixed;
  top: 10px;
  right: 0;
  z-index: 9;
  background-color: #5da832;
  color: white;
  cursor: pointer;
  border-radius: 5px 0 0 5px;
  border: 2px solid #5b412a;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.settings-wrapper:hover {
  background-color: #795548;
}

img {
	width: 4vh;
}
</style>