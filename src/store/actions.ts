import axios from "axios";
import jwtDecode from "jwt-decode";
import { ActionContext } from "vuex";
import { State, User } from "@/types/interfaces";

const actions = {
  async getDreamsFromApi({ commit }: ActionContext<State, State>): Promise<void> {
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/dreams/user-dreams`, {
      headers: {
        Authorization: `Bearer ${process.env.VUE_APP_TOKEN}`,
      },
    });
    commit("loadDreams", data);
  },
  async loginUser({ commit }: ActionContext<State, State>, user: User): Promise<void> {
    const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/users/login`, user);
    const { token } = data;
    const userInfo = jwtDecode(token);
    localStorage.setItem("token", JSON.stringify({ token }));
    commit("loadUser", userInfo);
  },
};

export default actions;
