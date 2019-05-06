<template>
	<div class="container">
		<div
			class="code"
			v-if="element"
		>
			<textarea
				placeholder="Input your code"
				v-on:change="codechange"
				v-on:keyup="codechange"
				v-bind:key="this.element.uid"
			>{{this.element.additionCode}}</textarea>
		</div>
		<div
			class="empty"
			v-else
		>
			Choose the element
		</div>
	</div>
</template>

<script>
export default {
	name: 'ScriptPanel',
	props: ['model'],
	computed: {
		initialPanelX: () => 10,
		initialPaneY: () => window.innerHeight - 210,

		element: function(){
			return this.model.activeElement;
		},
	},

	methods: {
		codechange: function(e){
			this.element.additionCode = e.target.value;
		}
	}
};
</script>

<style scoped lang="stylus">
.empty
	padding 15px 20px

.script-panel
	width 500px
	height 200px

textarea
	resize none
	width 480px
	height 144px
	background none
	border 0
	border-top solid 1px #ccc
	padding 10px
</style>
