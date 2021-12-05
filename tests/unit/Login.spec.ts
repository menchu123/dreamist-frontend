import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import router from "../../src/router";
import Login from "../../src/views/Login.vue";
import state from "../mockState";

describe("Given a Login component", () => {
  describe("When is rendered", () => {
    test("Should render a section html tag", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loginUser: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });

      expect(wrapper.html()).toContain('<section class="login">');
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

      const wrapper = mount(Login, {
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
  describe("When the form is submitted with a username and password", () => {
    test("Then it should invoke loginUser", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { loginUser: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(Login, {
        global: {
          plugins: [router, store],
        },
        mocks: {
          methods: {
            onSubmit: jest.fn(),
          },
        },
        stubs: ["router-link", "router-view"],
      });

      const onSubmit = jest.fn();

      onSubmit();
      const usernameInput = wrapper.get("input[id='username'");
      const passwordInput = wrapper.get("input[id='password'");
      const form = wrapper.get("form");
      await usernameInput.setValue("elsatheguapest");
      await passwordInput.setValue("ilovechuches4");
      form.trigger("submit");
      expect(onSubmit).toHaveBeenCalled();
      expect(store.state.user).toBeDefined();
    });
  });
});
