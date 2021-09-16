<template>
	<div :class="[modalActive ? 'modal-container modal-backdrop-show ' : ' ']">
		<transition name="fade" mode="out-in">
			<div v-show="modalActive" class="modal-container">
				<div class="modal modal-popup">
					<div class="modal-inner">		
						<slot />
						<div class="modal-action">
							<button @click="close" type="button" class="button">CLOSE</button>
						</div>						
					</div>
				</div>
			</div>
		</transition>
	</div>	
</template>

<script>
	export default {
		props: {
			modalActive: {
				default: true
			}
		},
		setup(props, { emit }) {
			const close = () => {
				emit('close')			
			}

			return {
				close
			}
		}
	}
</script>