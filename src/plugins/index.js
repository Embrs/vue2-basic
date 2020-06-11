import Vue from "vue";
import i18n from "./i18n";
import moment from "moment";
import rbac from "./rbac/RBAC";
import * as utils from "./utils";
import api from "./api";
import "./hashStorage";
import "./iview";

// -----------------------------------------------
const VuePrototype = (key, obj) => {
  const install = Vue => {
    if (install.installed) return;
    install.installed = true;
    Vue.prototype[`${key}`] = obj;
  };
  return install;
};

moment.suppressDeprecationWarnings = true;
Vue.use(VuePrototype("$moment", moment));
Vue.use(VuePrototype("$utils", utils));
Vue.use(VuePrototype("$api", api));

// -----------------------------------------------
Vue.directive("rbac", {
  inserted(el, binding) {
    const brandRule = localStorage.getObjectHash(window.brandRule);
    rbac.can(brandRule.role, binding.value, "components", (err, can) => {
      if (!can) {
        if (el.parentNode) el.parentNode.removeChild(el);
        else el.style.display = "none";
      } else {
        if (binding.modifiers.disable) {
          el.style.pointerEvents = "none";
          el.style.opacity = 0.4;
          el.childNodes.forEach(ChildElem => {
            if (ChildElem.localName === "input") {
              ChildElem.readOnly = true;
            }
          });
        }
      }
    });
  }
});

export { i18n };
