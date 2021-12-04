import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "../../src/router";
import NavBar from "../../src/components/NavBar.vue";
import state from "../mockState";

describe("Given a NavBar component", () => {
  describe("When is rendered", () => {
    test("Should render the section html tag", () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(NavBar, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });

      expect(wrapper.html()).toContain('<nav class="nav">');
    });
  });
});
