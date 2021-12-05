import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createRouter, createWebHistory } from "vue-router";
import NavBar from "../../src/components/NavBar.vue";
import state from "../mockState";

library.add(fas);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: {
        template: "Home",
      },
    },
    {
      path: "/login",
      component: {
        template: "Login",
      },
    },
    {
      path: "/dream-form",
      component: {
        template: "Form",
      },
    },
    {
      path: "/statistics",
      component: {
        template: "Statistics",
      },
    },
  ],
});

describe("Given a NavBar component", () => {
  describe("When is rendered", () => {
    test("Should render the section html tag", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(NavBar, {
        global: {
          plugins: [router, store],
        },
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<nav class="nav">');
    });
  });
});
