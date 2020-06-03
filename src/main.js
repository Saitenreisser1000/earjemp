import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './store/store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueRouter from 'vue-router'
//import Routes from "@/routes";
import intervalJemp from "@/components/intervalJemp/intervalJemp";
import chordJemp from "@/components/chordjemp/chordJemp";
import scaleJemp from "@/components/scaleJemp/scaleJemp";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', component: intervalJemp},
    { path: '/chordJemp', component: chordJemp},
    { path: '/scaleJemp', component: scaleJemp}
  ]
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
