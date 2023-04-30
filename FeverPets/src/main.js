import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BrowserUtils from './helpers/browser-utils.js'
import t from './plugins/translation.js'
import stringsES from './constants/strings/es.js'
import stringsEN from './constants/strings/en.js'

const app = createApp(App)

app.use(router)
app.use(store)

const lang = BrowserUtils.getUrlParam('lang') || BrowserUtils.getBrowserLanguage()
switch (lang) {
  case 'es':
  case 'es-ES':
    app.use(t, stringsES)
    break;
  default:
    app.use(t, stringsEN)
    break;
}

app.mount('#app')
