import { mount } from "@vue/test-utils";
import router from "../../src/router";
import Login from "../../src/views/Login.vue";

describe("Given a Header component", () => {
  describe("When is rendered", () => {
    test("Should render the header html tag", () => {
      const wrapper = mount(Login, {
        global: {
          plugins: [router],
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });

      expect(wrapper.html()).toContain('<section class="login">');
    });
  });
});
