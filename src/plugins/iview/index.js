import Vue from "vue";
import iView from "view-design";
import i18n from "@/plugins/i18n";
import "./iview-variables.less";

Vue.use(iView, {
  i18n(path, options) {
    const value = i18n.t(path, options);
    if (value !== null && value !== undefined) return value;
    return "";
  }
});
