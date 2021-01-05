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
import locale from 'element-ui/lib/locale/lang/es';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import VueLodash from 'vue-lodash';
import lodash from 'lodash';

Vue.use(VueLodash, { lodash: lodash })

firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(ElementUI, { locale })
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faUserSecret);

export const db = firebase.firestore();
export const storage = firebase.storage();

Vue.config.productionTip = false;

new Vue({
  router,
  store,  
  render: h => h(App)
}).$mount('#app')
