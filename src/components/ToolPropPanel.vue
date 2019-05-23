<script>
import toolPanels from './tool-panels';

export default {
	name: 'ToolPropPanel',

	props: ['toolsModel'],

	render: function(createElement){
		var panelContent = toolPanels[this.toolsModel.tool];
		var panelContentElem = createElement(panelContent, {
			props: {
				tool: this.toolsModel.toolModel
			},
			on: {
				change: (options) => {
					this.toolsModel.change(options);
				}
			}
		});

		return panelContent ? createElement('div', {
			class: 'tool-prop-panel'
		}, [panelContentElem]) : null;
	}
};
</script>

<style scoped lang="stylus">
.tool-prop-panel
	width 100%
	height 40px
	background #444
	color #ccc
	box-shadow 0 2px 2px rgba(0, 0, 0, 0.1), 0 5px 5px -4px rgba(0, 0, 0, 0.4)
</style>
