import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './routes'
import { store } from './store/store'
import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(vuetify).use(router).use(store).mount('#app')
