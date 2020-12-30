import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import store from './store/store.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import firebase from 'firebase';
import { firebaseConfig } from "./config/firebaseConfig";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
Vue.use(ElementUI);
library.add(faUserSecret);
Vue.component('font-awesome-icon', FontAwesomeIcon);
export const storage = firebase.storage();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
