import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../../src/views/SignUp.vue";
import state from "../mockState";

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
  ],
});

describe("Given a SignUp component", () => {
  describe("When is rendered", () => {
    test("Should render the section html tag", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { checkToken: jest.fn() },
      });

      const wrapper = mount(SignUp, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<section class="signup">');
    });
  });
  describe("When the form is submitted", () => {
    test("Then it should invoke onSubmit", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loginUser: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(SignUp, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });

      const onSubmit = jest.fn();
      onSubmit();
      const form = wrapper.get("form");
      form.trigger("submit");
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
