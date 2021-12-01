import { mount } from "@vue/test-utils";
import router from "../../src/router";
import NavBar from "../../src/components/NavBar.vue";

describe("Given a NavBar component", () => {
  describe("When is rendered", () => {
    test("Should render the section html tag", () => {
      const wrapper = mount(NavBar, {
        global: {
          plugins: [router],
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });

      expect(wrapper.html()).toContain('<section class="nav">');
    });
  });
});
