<template>
	<div class="buttons">
		<div
			v-for="item in items"
			v-bind:key="item.value"
			v-bind:class="['button', active === item.value && 'active']"
			v-on:click="$emit('change', item.value)"
		>
			{{item.text}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'BaseRadioButtons',

	props: ['items', 'active']
};
</script>

<style scoped lang="stylus">
.buttons
	display inline-block

.button
	cursor pointer
	display inline-block
	padding 5px 10px
	background #555
	&:first-child
		border-top-left-radius 13px
		border-bottom-left-radius 13px
	&:last-child
		border-top-right-radius 13px
		border-bottom-right-radius 13px
	&.active
		background #333
</style>
