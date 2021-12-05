import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createRouter, createWebHistory } from "vue-router";
import DreamForm from "../../src/views/DreamForm.vue";
import FormComponent from "../../src/components/FormComponent.vue";
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

describe("Given a DreamForm component", () => {
  describe("When is rendered", () => {
    test("Then it should render the form html tag with a class form", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { checkToken: jest.fn() },
      });

      const wrapper = mount(DreamForm, {
        global: {
          plugins: [router, store],
        },
        components: {
          "font-awesome-icon": FontAwesomeIcon,
          FormComponent,
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<form class="form" autocomplete="off" novalidate="">');
    });
  });
});
