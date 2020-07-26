import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

import vuetify from "./plugins/vuetify";
import router from "./plugins/router";

new Vue({
  el: "#app",
  router,
  vuetify,
  render: (h) => h(App),
});

//render App Component in <div id="app"><div>
