import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import notification from './plugins/notification'
import './assets/scss/index.scss'

createApp(App)
  .use(store)
  .use(router)
  .use(notification)
  .mount('#app')
