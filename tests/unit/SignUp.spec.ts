import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "../../src/router";
import SignUp from "../../src/views/SignUp.vue";
import state from "../mockState";

describe("Given a SignUp component", () => {
  describe("When is rendered", () => {
    test("Should render the section html tag", () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(SignUp, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });

      expect(wrapper.html()).toContain('<section class="signup">');
    });
  });
});
