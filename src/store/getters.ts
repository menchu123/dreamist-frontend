import { State, Dream } from "@/types/interfaces";

const getters = {
  sortDreams(state: State): Array<Dream> {
    return state.dreams.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  },
};

export default getters;
