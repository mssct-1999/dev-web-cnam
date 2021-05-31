import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session'
import './assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueSession)
Vue.use(VueGoogleMaps, {
  load: {
    key:"AIzaSyAbKpoQzFd4RJHY3ZtcmX85lk4SbQBgOmQ",
    librairies: 'places'
  }
})
Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')