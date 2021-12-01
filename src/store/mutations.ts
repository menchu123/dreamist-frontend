import { State, Dream, User } from "@/types/interfaces";

const mutations = {
  loadDreams(state: State, payload: Array<Dream>): void {
    state.dreams = payload;
  },
  loadUser(state: State, payload: User): void {
    state.user.user = payload;
    state.user.isAuthenticated = true;
  },
  addDream(state: State, payload: Dream): void {
    state.dreams = [...state.dreams, payload];
  },
  startLoading(state: State): void {
    state.isLoading = true;
  },
  stopLoading(state: State): void {
    state.isLoading = false;
  },
};

export default mutations;
