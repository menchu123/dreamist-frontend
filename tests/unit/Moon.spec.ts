import { mount } from "@vue/test-utils";
import Moon from "../../src/components/Moon.vue";

describe("Given a Moon component", () => {
  describe("When is rendered", () => {
    test("Should render the a section html tag with a moon class", async () => {
      const wrapper = mount(Moon);
      expect(wrapper.html()).toContain('<section class="moon">');
    });
  });
});
