import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { store } from './store/store'
import '@mdi/font/css/materialdesignicons.css'
import intervalJemp from "@/components/intervalJemp/intervalJemp";
import chordJemp from "@/components/chordjemp/chordJemp";
import scaleJemp from "@/components/scaleJemp/scaleJemp";
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: intervalJemp},
    { path: '/chordJemp', component: chordJemp},
    { path: '/scaleJemp', component: scaleJemp}
  ]
});

createApp(App).use(vuetify).use(router).use(store).mount('#app')
