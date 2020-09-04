import types from "../mutation-types";
import i18n from "@/plugins/i18n";

// --------------------
export const state = {
  locale: "zh",
  globalMask: false
};
// ----------------------------------------------------------------
export const mutations = {
  // 遮罩
  [types.GLOBAL_MASK](state, boolean) {
    state.globalMask = boolean;
  },
  // 語系
  [types.LANGUAGE](state, lang) {
    state.locale = lang;
    i18n.locale = lang;
  }
};

// ----------------------------------------------------------------
export const actions = {
  action_globalMask({ commit }, boolean) {
    commit(types.GLOBAL_MASK, boolean);
  },
  action_language({ commit }, lang) {
    commit(types.LANGUAGE, lang);
  }
};

// ----------------------------------------------------------------
export const getters = {
  getter_globalMask: state => state.globalMask,
  getter_locale: state => state.locale
};
