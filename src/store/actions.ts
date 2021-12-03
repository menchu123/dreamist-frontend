import axios from "axios";
import jwtDecode from "jwt-decode";
import { ActionContext } from "vuex";
import { State, User, Dream, DreamToUpdate } from "@/types/interfaces";

const actions = {
  async getDreamsFromApi({ commit }: ActionContext<State, State>): Promise<void | string> {
    commit("startLoading");
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/dreams/user-dreams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit("loadDreams", data);
      commit("stopLoading");
    } catch {
      return "Error fetching dreams";
    }
  },
  async getCurrentDream({ commit }: ActionContext<State, State>, id: string): Promise<void> {
    commit("startLoading");
    const { token } = JSON.parse(localStorage.getItem("token") || "");
    const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/dreams/user-dreams/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit("loadCurrentDream", data);
    commit("stopLoading");
  },
  async addDream({ commit }: ActionContext<State, State>, dream: Dream): Promise<void | string> {
    try {
      const { token } = JSON.parse(localStorage.getItem("token") || "");
      const { data: newDream } = await axios.post(
        `${process.env.VUE_APP_API_URL}/dreams/user-dreams/new`,
        dream,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      commit("addDream", newDream);
    } catch (error) {
      return "Error adding dream";
    }
  },
  async deleteDream({ commit }: ActionContext<State, State>, id: string): Promise<void> {
    commit("startLoading");
    const { token } = JSON.parse(localStorage.getItem("token") || "");
    await axios.delete(`${process.env.VUE_APP_API_URL}/dreams/user-dreams/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit("deleteCurrentDream", id);
    commit("stopLoading");
  },
  async updateDream({ commit }: ActionContext<State, State>, dream: DreamToUpdate): Promise<void> {
    commit("startLoading");
    const { token } = JSON.parse(localStorage.getItem("token") || "");
    const { data: updatedDream } = await axios.put(
      `${process.env.VUE_APP_API_URL}/dreams/user-dreams/edit/${dream.id}`,
      dream.formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    commit("updateDream", updatedDream);
    commit("stopLoading");
  },
  async loginUser({ commit }: ActionContext<State, State>, user: User): Promise<void> {
    const { data } = await axios.post(`${process.env.VUE_APP_API_URL}/users/login`, user);
    const { token } = data;
    const userInfo = jwtDecode(token);
    localStorage.setItem("token", JSON.stringify({ token }));
    commit("loadUser", userInfo);
  },
  async logoutUser({ commit }: ActionContext<State, State>): Promise<void> {
    localStorage.removeItem("token");
    const emptyUser = {
      userName: "",
      userId: "",
    };
    commit("emptyUser", emptyUser);
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
