<template>
	<portal to="window" v-if="visible">
		<div class="paranja">
			<div
				class="window"
				v-bind:style="{
					top: y + 'px',
					left: x + 'px'
				}"
			>
				<div
					class="header"
				>
					{{header}}
				</div>

				<div class="content">
					<slot />
				</div>
			</div>
		</div>
	</portal>
</template>

<script>
export default {
	name: 'BaseWindow',
	props: ['header', 'x', 'y', 'visible']
};
</script>

<style scoped lang="stylus">
.paranja
	width 100vw
	height 100vh
	position absolute
	z-index 999
	background rgba(0, 0, 0, 0.1)

.window
	background white
	display inline-block
	border-radius 3px
	box-shadow 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 4px -2px rgba(0, 0, 0, 0.3), 0 6px 6px -4px rgba(0, 0, 0, 0.3)
	position absolute

.header
	font-weight bold
	padding 10px
	user-select none
</style>
