import { State, Dream, User } from "@/types/interfaces";

const mutations = {
  loadDreams(state: State, payload: Array<Dream>): void {
    state.dreams = payload;
  },
  loadCurrentDream(state: State, payload: Dream): void {
    state.currentDream = payload;
  },
  loadUser(state: State, payload: User): void {
    state.user.user = payload;
    state.user.isAuthenticated = true;
  },
  emptyUser(state: State, payload: User): void {
    state.user.user = payload;
    state.user.isAuthenticated = false;
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
  deleteCurrentDream(state: State, payload: string): void {
    state.dreams = state.dreams.filter((dream: Dream) => dream.id !== payload);
  },
  updateDream(state: State, payload: Dream): void {
    state.dreams = state.dreams.map((dream) =>
      dream.id === payload.id
        ? {
            ...dream,
            ...payload,
          }
        : dream
    );
  },
};

export default mutations;
