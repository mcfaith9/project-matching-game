<template>
	<div class="progress-wrapper">			
		<div class="progress">
			<h1 class="progress-text"></h1>
			<div class="progress-bar">
				<div :class="[almostTimeout ? ' ' : 'progress-red']" data-progress="0" :style="`width:${timer}%`"></div>
			</div>
		</div>		
		<h2 class="timer-text">{{ timer }} sec</h2> 		
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