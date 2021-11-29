import { mount } from "@vue/test-utils";
import router from "../../src/router";
import DreamForm from "../../src/views/DreamForm.vue";

describe("Given a Header component", () => {
  describe("When is rendered", () => {
    test("Should render the header html tag", () => {
      const wrapper = mount(DreamForm, {
        global: {
          plugins: [router],
        },
        stubs: [
          "router-link",
          "router-view",
          "FontAwesomeIcon",
        ],
      });

      expect(wrapper.html()).toContain(
        '<form class="form" autocomplete="off" novalidate="">'
      );
    });
  });
});
