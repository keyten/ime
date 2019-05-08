<template>
	<div
		class="menu"
		v-if="visible"
		v-bind:style="{
			top: coords[1] + 'px',
			left: coords[0] + 'px'
		}"
	>
		<div
			class="menu-item"
			v-for="item in items"
			v-bind:key="item.text"
			v-on:click="item.callback(); callback && callback()"
		>
			{{item.text}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'BaseMenu',
	props: ['items', 'visible', 'callback', 'coords']
};
</script>

<style scoped lang="stylus">
.menu
	background #444
	box-shadow 0 2px 2px rgba(0, 0, 0, 0.1), 0 5px 5px -4px rgba(0, 0, 0, 0.4)
	border-radius 3px
	position absolute

.menu-item
	padding 10px 20px
	color #ccc
	cursor pointer
	&:hover
		color #ddd
	&:active
		background #222
	&:first-child
		border-top-left-radius 3px
		border-top-right-radius 3px
	&:last-child
		border-bottom-right-radius 3px
		border-bottom-left-radius 3px
</style>
