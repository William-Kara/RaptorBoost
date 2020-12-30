import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import SkeletonCards from 'vue-ultimate-skeleton-cards'
Vue.use(SkeletonCards)

import VueYouTubeEmbed from 'vue-youtube-embed'
import vuetify from './plugins/vuetify';
import i18n from './i18n'
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
