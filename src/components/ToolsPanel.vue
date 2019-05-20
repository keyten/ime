<template>
	<div class="container">
		<!-- <div class="inside">
			<div
				class="tool-button"
				v-for="tool in tools"
				v-bind:key="tool"
				v-bind:class="{active: model.tool === tool}"
				v-on:click="toolChange(tool)"
			>
				{{tool}}
			</div>
		</div>

		<!-- For save dialog -->
		<!-- <div class="right-buttons">
			<div class="save-btn" v-on:click="saveVisible = true">Save</div>
			<ExportWindow
				v-bind:visible="saveVisible"
				v-bind:model="canvasModel"
				v-on:close="saveVisible = false"
			/>
		</div> -->
		<div class="panelle">
			<div
				class="tool-button"
				v-for="tool in tools"
				v-bind:key="tool"
				v-bind:class="{active: model.tool === tool}"
				v-on:click="toolChange(tool)"
			>
				{{tool}}
			</div>
		</div>

		<div class="color-container">
			<div class="swap-colors" v-on:click="changeColors" />
			<div class="default-colors" v-on:click="resetColors" />
			<div class="bg-color" v-bind:style="{background: canvasModel.bcolor}" />
			<div class="fg-color" v-bind:style="{background: canvasModel.fcolor}" />
		</div>
	</div>
</template>

<script>
import ExportWindow from './ExportWindow.vue';

export default {
	name: 'ToolsPanel',
	props: ['model', 'canvasModel'],

	components: {
		ExportWindow
	},

	data: () => ({
		tools: ['pointer', 'brush', 'rect', 'path', 'hand'],
		saveVisible: false
	}),

	methods: {
		toolChange: function(tool){
			this.model.tool = tool;
		},

		changeColors: function(){
			var {fcolor, bcolor} = this.canvasModel;
			this.canvasModel.fcolor = bcolor;
			this.canvasModel.bcolor = fcolor;
		},

		resetColors: function(){
			this.canvasModel.fcolor = '#ffffff';
			this.canvasModel.bcolor = '#000000';
		}
	}
};
</script>

<style lang="stylus" scoped>
.panelle
	box-shadow 0 2px 2px rgba(0, 0, 0, 0.1), 0 5px 5px -4px rgba(0, 0, 0, 0.4)
	border-top-right-radius 5px
	border-bottom-right-radius 5px
	.tool-button
		background #444
		color #ccc
		display block
		width 46px
		height 40px
		cursor pointer
		overflow hidden
		border-top solid 1px #555
		display flex
		align-items center
		padding-left 10px
		box-sizing border-box
		&:first-child
			border-top 0
			border-top-right-radius 5px
		&:last-child
			border-bottom-right-radius 5px
		&:hover
			color #ddd
		&.active, &:active
			color #eee
			background #222
			box-shadow inset 0 5px 5px rgba(0, 0, 0, 0.7)

.bg-color, .fg-color
	width 30px
	height 30px
	box-shadow 0 0 2px gray, 0 1px 1px gray
	cursor pointer

.fg-color
	margin-top -45px

.bg-color
	margin-top 30px
	margin-left 15px

.swap-colors, .default-colors
	background rgba(0, 0, 0, 0.2)
	width 10px
	height 10px
	position absolute
	transition background 1s
	cursor pointer
	&:hover
		background rgba(0, 0, 0, 0.4)

.swap-colors
	border-top-right-radius 8px
	margin-left 35px
	margin-top -15px

.default-colors
	margin-top 20px
	border-bottom-left-radius 8px

/*  .container
	display grid
	grid-template-columns auto auto

.right-buttons
	text-align right

.tool-button
	padding 12px 20px
	padding-bottom 13px
	cursor pointer
	display inline-block
	&.active
		background #eee

.save-btn
	padding 12px 20px
	padding-bottom 13px
	cursor pointer
	display inline-block
	&:hover
		background #eee
	border-bottom-right-radius 8px */
</style>
