<template>
	<div class="item">
		{{'Name: ' + element.name}}
	</div>
</template>

<script>
export default {
	name: 'LayersPanelItem',

	props: ['element']
};
</script>

<style scoped lang="stylus">
.item
	padding 15px
	cursor pointer
	&:active, &.active
		background #eee
</style>
