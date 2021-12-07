import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import Moon from "../../src/components/Moon.vue";
import state from "../mockState";

describe("Given a Moon component", () => {
  describe("When is rendered", () => {
    test("Should render the a section html tag with a moon class", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { toggleLight: jest.fn() },
      });

      const wrapper = mount(Moon, {
        global: {
          plugins: [store],
        },
        stubs: ["router-link", "router-view"],
      });
      expect(wrapper.html()).toContain('<section class="moon">');
    });
  });
});
