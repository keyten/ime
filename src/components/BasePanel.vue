<template>
	<div
		class="panel"
		v-bind:style="{
			top: yCoord + 'px',
			left: xCoord + 'px'
		}"
	>
		<div
			class="header"
			v-on:mousedown="mousedown"
		>
			{{header}}
		</div>

		<div class="content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {
	name: 'BasePanel',
	props: ['header', 'x', 'y'],

	data: () => ({xDragged: null, yDragged: null}),

	computed: {
		xCoord: function(){
			return this.xDragged === null ? this.x : this.xDragged;
		},

		yCoord: function(){
			return this.yDragged === null ? this.y : this.yDragged;
		}
	},

	methods: {
		mousedown: function(e){
			const bounds = this.$el.getBoundingClientRect();
			const x = e.clientX - bounds.left;
			const y = e.clientY - bounds.top;

			const mousemove = (e) => {
				this.xDragged = Math.min(Math.max(e.clientX - x, 0), window.innerWidth - bounds.width);
				this.yDragged = Math.min(Math.max(e.clientY - y, 0), window.innerHeight - bounds.height);
			};

			const mouseup = () => {
				window.removeEventListener('mousemove', mousemove);
				window.removeEventListener('mouseup', mouseup);
			};

			window.addEventListener('mousemove', mousemove);
			window.addEventListener('mouseup', mouseup);
		}
	}
};
</script>

<style scoped lang="stylus">
.panel
	position absolute
	background rgba(240, 240, 240, 0.7)
	border solid 1px rgba(255, 255, 255, 0.5)
	border-radius 3px
	min-width 200px
	box-shadow 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 4px -2px rgba(0, 0, 0, 0.3), 0 6px 6px -4px rgba(0, 0, 0, 0.3)

.header
	font-weight bold
	padding 10px
	user-select none
</style>
