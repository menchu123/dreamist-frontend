import { State, Dream } from "@/types/interfaces";

const mutations = {
  loadDreams(state: State, payload: Array<Dream>): void {
    state.dreams = payload;
  },
};

export default mutations;
