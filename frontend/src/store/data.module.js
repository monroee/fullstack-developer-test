import { DataService } from "@/common/api.service";
import { SET_DATA_LOAD, SET_DATA, SET_DATA_ERROR } from "./mutations.type";
import { FETCH_DATA } from "./actions.type";

const state = {
  error: null,
  loading: false,
  data: [],
  data_length: 0
};

const getters = {};

const actions = {
  [FETCH_DATA](context) {
    context.commit(SET_DATA_LOAD);
    DataService.getData()
      .then( data => {
        context.commit(SET_DATA, data.data);
      })
      .catch(error => {
        context.commit(SET_DATA_ERROR, error);
      });
  },
};

const mutations = {
  [SET_DATA_LOAD](state) {
    state.loading = true;
  },
  [SET_DATA](state, data) {
    state.data = data;
    state.data_length = data.length;
    state.loading = false;
  },
  [SET_DATA_ERROR](state, error) {
    state.error = error;
    state.loading = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
