import { mount } from "@vue/test-utils";
import router from "../../src/router";
import DreamForm from "../../src/views/DreamForm.vue";

describe("Given a DreamForm component", () => {
  describe("When is rendered", () => {
    test("Should render a form html tag", () => {
      const wrapper = mount(DreamForm, {
        global: {
          plugins: [router],
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });

      expect(wrapper.html()).toContain('<form class="form" autocomplete="off" novalidate="">');
    });
  });
});
