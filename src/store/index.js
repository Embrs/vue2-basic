import Vue from "vue";
import Vuex from "vuex";
import { modules } from "@/tools/js/store-register";

Vue.use(Vuex);

export default new Vuex.Store(modules);
