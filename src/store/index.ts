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
      const { data } = await axios.get(
        `${process.env.VUE_APP_API_URL}/dreams/user-dreams`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
          },
        }
      );
      commit("loadDreams", data);
    },
  },
  modules: {},
});
