import Vue from "vue";
import Vuex from "vuex";

import data from "./data.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    data
  }
});
