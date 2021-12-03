import { Commit } from "vuex";
import { State } from "@/types/interfaces";

const configActionContext = (commit: Commit): any => ({
  commit,
  dispatch: jest.fn(),
  getters: jest.fn(),
  rootState: {} as State,
  rootGetters: jest.fn(),
});

export default configActionContext;
