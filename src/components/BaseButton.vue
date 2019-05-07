<template>
	<button
		class="button"
		v-on:click="$emit('click')"
	>
		{{text}}
	</button>
</template>

<script>
export default {
	name: 'BaseButton',
	props: ['text']
};
</script>

<style scoped lang="stylus">
.button
	padding 7px 15px
	background linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5));
	border solid 1px #ccc
	border-radius 4px
	box-shadow 0 3px 3px rgba(0, 0, 0, 0.1)
	outline 0
	cursor pointer
	&:hover
		background linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7));
		border-color #bbb
	&:active
		background #999
		box-shadow inset 0 3px 3px rgba(0, 0, 0, 0.3), 0 1px white
		border-color #777
</style>
