<template>
	<div class="container">
		<BaseRange
			v-bind:min="0.5"
			v-bind:max="10"
			v-bind:step="0.01"
			v-bind:value="model.zoom"
			v-on:change="onValueChange"
		/>
	</div>
</template>

<script>
import BaseRange from './BaseRange.vue';

export default {
	name: 'ZoomPanel',
	components: {
		BaseRange
	},
	props: ['model'],
	methods: {
		onValueChange: function(value){
			this.model.zoom = +value.toFixed(2);
		}
	}
};
</script>

<style scoped lang="stylus">
.container
	padding 15px 20px
</style>
