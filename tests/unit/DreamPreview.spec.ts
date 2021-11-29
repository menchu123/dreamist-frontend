import { mount } from "@vue/test-utils";
import router from "../../src/router";
import DreamPreview from "../../src/components/DreamPreview.vue";

describe("Given a Header component", () => {
  describe("When is rendered", () => {
    test("Should render the header html tag", () => {
      const wrapper = mount(DreamPreview, {
        global: {
          plugins: [router],
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });

      expect(wrapper.html()).toContain('<section class="dream-prev">');
    });
  });
});
