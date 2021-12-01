import axios from "axios";
import { ActionContext } from "vuex";
import { State } from "@/types/interfaces";

const actions = {
  async getDreamsFromApi({ commit }: ActionContext<State, State>): Promise<void> {
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/dreams/user-dreams`, {
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
      },
    });
    commit("loadDreams", data);
  },
};

export default actions;
