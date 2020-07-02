import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VCalendar from 'v-calendar';
import ApiService from "./common/api.service";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Vue.config.productionTip = false

ApiService.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
