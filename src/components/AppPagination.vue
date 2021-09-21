<template>
	<div class="pagination-wrapper">
		<div class="pagination"> 	
			<a  href="#" v-for="link in links" :key="link.id" @click="paginate(link.url)" :class="[ link.active ? 'active' : ' ', link.url == null ? 'a-disable' : '' ]">
				<span v-html="link.label"></span>
			</a>		
		</div>
	</div>
</template>

<script>		
export default {
	emits: ['paginate'],
	props: {
		links: {
			type: Object,
			required: false,
		}
	},
	setup(props, { emit }) {		
		const paginate = async (link) => {		
			emit('paginate', link)
		}
		return {
			paginate
		}
	}
}
</script>

<style scoped>
.pagination {
  display: inline-block;
  margin-top: 5px;  
  border-radius: 10px;
  border: 2px solid #5b412a;
}

.pagination a:first-child {  
	border-radius: 8px 0 0 8px;
}

.pagination a:last-child {  
	border-radius: 0 8px 8px 0;
}

.pagination a {
  color: #f3f3f3;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;  
  background-color: #5da832;  
}

.pagination a.active {
  background-color: #795548;
  color: white;
}

.pagination a:hover:not(.active) {
	color: white;
	background-color: #795548;
}

.a-disable {
	pointer-events: none;
  cursor: default;
  color: #dddd !important;
  background-color: #6c757d !important;
}
</style>