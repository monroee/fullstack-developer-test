import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = API_URL;
    Vue.axios.defaults.headers.Accept = "application/json";
  },

  async get(resource) {
    return await Vue.axios.get(`${resource}`);
  }
};

export default ApiService;

export const DataService = {
  getData() {
    return ApiService.get("data/all");
  }
};
