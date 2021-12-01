import axios from "axios";
import jwtDecode from "jwt-decode";
import { ActionContext } from "vuex";
import { State, User } from "@/types/interfaces";

const actions = {
  async getDreamsFromApi({ commit }: ActionContext<State, State>): Promise<void | string> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/dreams/user-dreams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("loadDreams", data);
    } catch {
      return "Error fetching dreams";
    }
  },
  async loginUser({ commit }: ActionContext<State, State>, user: User): Promise<void> {
    const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/users/login`, user);
    const { token } = data;
    const userInfo = jwtDecode(token);
    localStorage.setItem("token", JSON.stringify({ token }));
    commit("loadUser", userInfo);
  },
  checkToken({ commit }: ActionContext<State, State>): string | void {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "");
      commit("loadUser", jwtDecode(token.token));
    } catch {
      return "Not logged in";
    }
  },
};

export default actions;
