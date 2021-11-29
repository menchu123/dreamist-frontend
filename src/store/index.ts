import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    dreams: [],
  },
  mutations: {
    loadDreams(state, payload): void {
      state.dreams = payload;
    },
  },
  actions: {
    async getDreamsFromApi({ commit }): Promise<void> {
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/dreams/user-dreams`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWNmNTNiYzNjMzA3Zjg1Y2ViZGMzYiIsIm5hbWUiOiJFbHNhIiwiaWF0IjoxNjM4MjExNjE1LCJleHAiOjE2Mzg0NzA4MTV9.1NxiF6uHVQBN_w5yrw9FMa9fGgOSgHfBpkxDcgR0CjA",
        },
      });
      commit("loadDreams", data);
    },
  },
  modules: {},
});
