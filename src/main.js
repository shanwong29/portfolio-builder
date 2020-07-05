import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

Vue.config.productionTip = false;

import { routes } from "./routes";

// step 2
const router = new VueRouter({
  routes,
  mode: "history",
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition;
  //   }

  //   if (to.hash) {
  //     return { selector: to.hash };
  //   }
  //   return { x: 0, y: 0 };
  // },
});

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});

//render App Component in <div id="app"><div>
