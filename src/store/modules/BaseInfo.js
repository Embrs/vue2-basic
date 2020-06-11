import types from "../mutation-types";

const state = {
  testInfo: {
    aa: "aa"
  }
};

// ----------------------------------------------------------------
const mutations = {
  [types.BASEINFO](state, testInfo) {
    state.testInfo = testInfo;
  }
};

// ----------------------------------------------------------------
const actions = {
  /**
   * set userInfo
   * @param { String } userInfo userInfo
   */
  Action_SetTestInfo({ commit }, testInfo) {
    commit(types.BASEINFO, testInfo);
  },
  /**
   * reset userInfo
   */
  Action_RestTestInfo({ commit }) {
    commit(types.BASEINFO, "");
  }
};

// ----------------------------------------------------------------
const getters = {
  Getter_TestInfo: state => state.testInfo
};

export default {
  state,
  mutations,
  actions,
  getters
};
