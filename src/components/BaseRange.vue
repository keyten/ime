<template>
	<div class="range" ref="range">
		<div class="title">
			{{title}}
			<input
				type="text"
				v-bind:value="value"
			/>
		</div>
		<div class="slider">
			<div
				v-bind:style="{
					marginLeft: (160 * percent - 5) + 'px'
				}"
				class="draggable"
				ref="draggable"
				v-on:mousedown="draggableDown"
			></div>
			<div class="line"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BaseRangeInput',
	props: ['min', 'max', 'step', 'value', 'title'],

	computed: {
		percent: function(){
			return (this.value - this.min) / (this.max - this.min);
		}
	},

	methods: {
		draggableDown: function(e){
			const left = this.$refs.range.getBoundingClientRect().left;

			const mousemove = (e) => {
				var t = (e.clientX - left) / 160;
				t = Math.max(Math.min(t, 1), 0);
				var val = this.min + t * (this.max - this.min);
				val = val - val % this.step;
				this.$emit('change', val);
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
.range
	min-width 150px

.line
	display block
	width 100%
	height 10px
	background #555
	margin-top 9px
	border-radius 5px

.draggable
	position absolute
	width 10px
	height 10px
	border-radius 100%
	background #ccc
	margin-top -2px
	cursor pointer
	border solid 2px #444
	&:hover
		background #ddd
	&:active
		background #eee

.title
	font-weight 500

input
	width 25px
	height 16px
	float right
	border 0
	background 0
	outline 0
/* .range
	display inline-grid
	grid-template-columns auto 30px
	min-width 150px

.slider
	height 25px
	box-sizing border-box
	border-right 0
	border-top-left-radius 4px
	border-bottom-left-radius 4px
	user-select none

.line
	display block
	width 100%
	height 5px
	background #eee
	box-shadow inset 0 1px 2px rgba(0, 0, 0, 0.1)
	margin-top 9px
	border solid 1px #ddd
	border-top-left-radius 5px
	border-bottom-left-radius 5px

.draggable
	position absolute
	width 20px
	height 20px
	margin-top 1px
	border-radius 100%
	background #fff
	background linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5));
	border solid 1px #ccc
	box-shadow 0 3px 3px rgba(0, 0, 0, 0.1)
	cursor pointer
	&:hover
		background linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7));
		border-color #bbb
	&:active
		background #999
		box-shadow inset 0 3px 3px rgba(0, 0, 0, 0.3), 0 1px white
		border-color #777

input
	background white
	height 25px
	padding 5px
	box-sizing border-box
	border solid 1px #ccc
	outline 0
	border-top-right-radius 4px
	border-bottom-right-radius 4px
	&:focus
		border-color #aaa */
</style>
