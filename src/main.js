import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "@/plugins";

// 阻止啟動生產消息
Vue.config.productionTip = false;

// 暫存
window.userInfo = "user";
window.accountInfo = "accountInfo";
window.brandRule = "brandRule";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
