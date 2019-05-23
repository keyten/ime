<template>
	<div class="rect-tool-panel">
		<BaseRadioButtons
			v-bind:items="typeButtons"
			v-bind:active="tool.type"
			v-on:change="typeChange"
		/>
	</div>
</template>

<script>
import BaseRadioButtons from '../BaseRadioButtons.vue';

export default {
	name: 'RectToolPanel',

	props: ['tool'],

	components: {
		BaseRadioButtons
	},

	data: () => ({
		typeButtons: [{
			value: 'vector',
			text: 'Vector'
		}, {
			value: 'raster',
			text: 'Raster'
		}]
	}),

	methods: {
		typeChange: function(type){
			this.$emit('change', {type});
		}
	}
};
</script>

<style scoped lang="stylus">
.rect-tool-panel
	height 40px
	padding-top 5px
	box-sizing border-box
	padding-left 14px
</style>
