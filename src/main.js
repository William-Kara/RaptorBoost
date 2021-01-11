import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "@fortawesome/fontawesome-free/css/all.css";

import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapVue from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

import SkeletonCards from "vue-ultimate-skeleton-cards";
Vue.use(SkeletonCards);

import VueYouTubeEmbed from "vue-youtube-embed";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
Vue.use(VueYouTubeEmbed);

import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
Vue.use(VueSidebarMenu);

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCEaxh77nmwaw7wMJYzm2yiqduYCa_BaLQ",
    authDomain: "project-vod-d6fa4.firebaseapp.com",
    projectId: "project-vod-d6fa4",
    storageBucket: "project-vod-d6fa4.appspot.com",
    messagingSenderId: "772151794196",
    appId: "1:772151794196:web:3456a5dd7a8d4dfd96e501",
    measurementId: "G-Y5060RYW9H"
}

firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

Vue.directive("click-outside", {
  priority: 700,
  bind() {
    let self = this;
    this.event = function(event) {
      console.log("emitting event");
      self.vm.$emit(self.expression, event);
    };
    this.el.addEventListener("click", this.stopProp);
    document.body.addEventListener("click", this.event);
  },

  unbind() {
    console.log("unbind");
    this.el.removeEventListener("click", this.stopProp);
    document.body.removeEventListener("click", this.event);
  },
  stopProp(event) {
    event.stopPropagation();
  },
});
