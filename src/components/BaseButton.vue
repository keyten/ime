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
	background white
	border solid 1px #aaa
	padding 5px 10px
	border-radius 4px
	cursor pointer
	color black !important
	outline 0
	&:hover
		border-color #888
	&:active
		background #eee
</style>
