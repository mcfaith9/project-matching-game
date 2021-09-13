<template>
	<div class="progress-wrapper">			
		<div class="progress">
			<h1 class="progress-text"></h1>
			<div class="progress-bar">
				<div v-if="almostTimeout" data-progress="0" :style="`width:${timer}%`"></div>
				<div v-else class="progress-red" data-progress="0" :style="`width:${timer}%`"></div>
			</div>
		</div>		
		<h2>{{ timer }} sec</h2> 		
	</div>
</template>

<script>
export default {
	props: {
		timer: {
			type: Number,
			required: true,
		},
		almostTimeout: {
			type: Boolean,
			default: true,
		}
	}
}
</script>

<style scoped>
h2 {
	color: #000f;	
}

.progress-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}

.progress {
	max-width: 400px;
	width: 100%;	
}
.progress-text {
	opacity: 0;
	transition: opacity 0.3s;
}
.progress-text.is-active {
	opacity: 1;
}
.progress-bar {
	background-color: #5b412a;
	border-radius: 10px;
	height: 20px;
	position: relative;
	overflow: hidden;
	margin: 20px 20px 20px 0;
	border: 2px solid #5b412a;
}
.progress [data-progress] {
	background-color: #5da832;
	border-radius: 10px;
	height: 100%;
	width: 0;
	line-height: 30px;
	position: absolute;
}
.progress-red {
	background-color: #ff3333 !important;
}
</style>