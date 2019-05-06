<template>
	<div class="container">
		<div
			class="list"
			v-if="element"
		>
			<div
				class="propitem"
				v-for="(type, key) in methods"
			>
				<div class="propname">
					{{key}}
				</div>
				<div class="propval">
					<input
						type="number"
						v-if="type === Number"
						v-bind:value="element.attr(key)"
						v-on:change="propchange(key, $event, Number)"
					/>
					<input
						type="text"
						v-if="type === String"
						v-bind:value="element.attr(key)"
						v-on:change="propchange(key, $event, String)"
					/>
					<input
						type="checkbox"
						v-if="type === Boolean"
						v-bind:checked="element.attr(key)"
						v-on:change="propchange(key, $event, Boolean)"
					/>
				</div>
			</div>
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
	name: 'PropsPanel',
	props: ['model'],
	computed: {
		element: function(){
			return this.model.activeElement;
		},

		methods: function(){
			return {
				x: Number,
				y: Number,
				width: Number,
				height: Number,
				fill: String,
				stroke: String,
				visible: Boolean,
				opacity: Number,
				composite: String,
				filter: String
			};
		}
	},

	methods: {
		propchange: function(attrName, e, cls){
			this.element.attr(attrName, cls(e.target.value));
		}
	}
};
</script>

<style scoped lang="stylus">
.empty
	padding 15px 20px

.propitem
	border-top 1px solid #ccc

.propname
	display inline-block
	width 80px
	padding 5px 10px
	box-sizing border-box

.propval
	display inline-block
	& input
		width 120px
</style>
