<template>
	<div class="top-menu" ref="topMenu">
		<a
			href="javascript:"
			v-for="(menu, item) in items"
			v-bind:key="item"
			v-bind:class="{active: menu.open}"
			v-on:click="menu.open = !menu.open;"
		>
			{{item}}
		</a>

		<portal to="menu">
			<BaseMenu
				v-for="(menu, item, i) in items"
				v-bind:key="item"
				v-bind:items="menu.items"
				v-bind:visible="menu.open"
				v-bind:coords="[itemLeftCoord(i), 35]"
				v-bind:class="['submenu', i === 0 ? 'first-submenu' : '']"
				v-bind:callback="() => menu.open = false"
			/>
		</portal>

	</div>
</template>

<script>
import BaseMenu from './BaseMenu.vue';
import uiModel from '../models/Ui.js';

export default {
	name: 'TopMenu',

	props: [],

	components: {
		BaseMenu
	},

	data: () => ({
		items: {
			'File': {
				open: false,
				items: [{
					text: 'Open',
					callback: function(){}
				}, {
					text: 'Export to js',
					callback: function(){
						uiModel.exportWindowVisible = true;
					}
				}, {
					text: 'Close',
					callback: function(){}
				}]
			},
			'Layers': {
				open: false,
				items: [{
					text: 'Remove',
					callback: function(){}
				}]
			}
		}
	}),

	methods: {
		itemLeftCoord: function(i){
			return this.$refs.topMenu ? this.$refs.topMenu.querySelectorAll('a')[i].getBoundingClientRect().left : 0;
		}
	}
};
</script>

<style scoped lang="stylus">
.top-menu
	background #444
	height 35px
	font-size 9px
	box-shadow 0 2px 2px rgba(0, 0, 0, 0.1), 0 5px 5px -4px rgba(0, 0, 0, 0.4)
	a
		padding 0 14px
		text-decoration none
		color #ccc
		line-height 35px
		height 35px
		display inline-block
		&:hover
			color #ddd
		&:active, &.active
			color #eee
			background #222
			box-shadow inset 0 5px 5px rgba(0, 0, 0, 0.7)

.submenu
	position absolute
	top 35px
	border-top-left-radius 0
	border-top-right-radius 0
	& .menu-item
		border-top-left-radius 0
		border-top-right-radius 0

.first-submenu
	border-bottom-left-radius 0
	& .menu-item
		border-bottom-left-radius 0
</style>
