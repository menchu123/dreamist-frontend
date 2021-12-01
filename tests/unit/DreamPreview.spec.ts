import { mount } from "@vue/test-utils";
import router from "../../src/router";
import DreamPreview from "../../src/components/DreamPreview.vue";

describe("Given a DreamPreview component", () => {
  describe("When is rendered", () => {
    test("Should render the a section html tag", () => {
      const wrapper = mount(DreamPreview, {
        global: {
          plugins: [router],
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
        props: {
          dream: {
            date: "2",
            description: "hola",
            type: "normal",
          },
        },
      });

      expect(wrapper.html()).toContain('<section class="dream-prev">');
    });
  });
});
