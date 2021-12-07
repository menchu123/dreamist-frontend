import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import DreamPreview from "../../src/components/DreamPreview.vue";
import state from "../mockState";

library.add(fas);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/dream-form/:id",
      component: {
        template: "Dream detail",
      },
    },
    {
      path: "/",
      component: {
        template: "Home",
      },
    },
  ],
});

describe("Given a DreamPreview component", () => {
  describe("When is rendered", () => {
    test("Should render the a section html tag", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { checkToken: jest.fn() },
      });

      const wrapper = mount(DreamPreview, {
        global: {
          plugins: [router, store],
        },
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
        props: {
          dream: {
            date: "2",
            description:
              "Most angery pupper I have ever seen very hand that feed shibe pupperino much ruin.",
            type: "normal",
          },
        },
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<section class="dream-prev">');
    });
  });
  describe("When is rendered", () => {
    test("Should render the a section html tag", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { checkToken: jest.fn() },
      });

      const wrapper = mount(DreamPreview, {
        global: {
          plugins: [router, store],
        },
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
        props: {
          dream: {
            date: "2",
            description: "Hola",
            type: "normal",
          },
        },
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<section class="dream-prev">');
    });
  });
});
