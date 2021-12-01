import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "../../src/router";
import Login from "../../src/views/Login.vue";
import state from "../mockState";

describe("Given a Login component", () => {
  describe("When is rendered", () => {
    test("Should render a section html tag", () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });

      expect(wrapper.html()).toContain('<section class="login">');
    });
  });
});
