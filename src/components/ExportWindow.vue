<template>
	<BaseWindow
		header="Export"
		v-bind:visible="visible"
		v-bind:x="x"
		v-bind:y="y"
	>
		<div class="container">
			<canvas
				v-bind:width="model.width"
				v-bind:height="model.height"
				id="testCanvas"
			></canvas>
		</div>
		<div class="buttons">
			<BaseButton text="Close" v-on:click="$emit('close')" />
			<BaseButton text="Save" />
		</div>
	</BaseWindow>
</template>

<script>
import BaseWindow from './BaseWindow.vue';
import BaseButton from './BaseButton.vue';
import {script} from '../lib/export';

export default {
	name: 'ExportWindow',
	props: ['visible', 'model'],

	components: {
		BaseWindow,
		BaseButton
	},

	computed: {
		x: function(){
			return window.innerWidth / 2 - this.model.width / 2;
		},

		y: function(){
			return window.innerHeight / 2 - this.model.height / 2 - 33;
		}
	},

	methods: {
		renderCanvas: function(){
			var code = script(this.model, 'testCanvas');
			console.log(code);
			eval(code);
		}
	},

	watch: {
		visible: function(value){
			if(value){
				setImmediate(this.renderCanvas);
			}
		}
	}
};
</script>

<style scoped lang="stylus">
.container
	border-top solid 1px #ccc
	border-bottom solid 1px #ccc
.buttons
	background #eee
	padding 10px
	text-align right
	& > button
		width 70px
		margin-right 10px
</style>
