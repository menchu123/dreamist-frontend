import axios from "axios";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import SignUp from "../../src/views/SignUp.vue";
import state from "../mockState";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(SignUp, {
        global: {
          plugins: [router, store],
          mocks: {
            $route,
            $router,
          },
        },
        stubs: ["router-link", "router-view"],
      });

      mockedAxios.post.mockResolvedValue(null);
      const onSubmit = jest.fn();
      onSubmit();
      const form = wrapper.get("form");
      form.trigger("submit");
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe("When the form is submitted but axios fails", () => {
    test("Then wrong credentials should be set to false", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loginUser: jest.fn(), checkToken: jest.fn() },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };
      const wrapper = mount(SignUp, {
        global: {
          plugins: [router, store],
          mocks: {
            $route,
            $router,
          },
        },
        data() {
          return {
            wrongCredentials: true,
          };
        },
        stubs: ["router-link", "router-view"],
      });

      mockedAxios.post.mockRejectedValue("no");
      const onSubmit = jest.fn();
      onSubmit();
      const form = wrapper.get("form");
      form.trigger("submit");
      expect(wrapper.vm.wrongCredentials).toBeFalsy();
    });
  });
  describe("When is rendered", () => {
    test("Should render the section html tag", async () => {
      const store = createStore({
        state() {
          const stateDesktop = state;
          stateDesktop.user.isAuthenticated = true;
          return stateDesktop;
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
});
