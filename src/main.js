import Vue from 'vue';
import PortalVue from 'portal-vue'
import App from './App.vue';

Vue.use(PortalVue);
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
}).$mount('#app');
