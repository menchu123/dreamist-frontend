import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { createRouter, createWebHistory } from "vue-router";
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

describe("Given a FormComponent component", () => {
  describe("When is rendered", () => {
    test("Then it should render the form html tag with a class form", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { checkToken: jest.fn() },
      });

      const wrapper = mount(FormComponent, {
        global: {
          plugins: [router, store],
        },
        components: {
          "font-awesome-icon": FontAwesomeIcon,
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<form class="form" autocomplete="off" novalidate="">');
    });
  });
  describe("When the form is submitted", () => {
    test("Then it should invoke onSubmit", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { addDream: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(FormComponent, {
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
  describe("When the form is submitted with an image", () => {
    test("Then it should invoke onSubmit", () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { addDream: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(FormComponent, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });

      const onSubmit = jest.fn();
      onSubmit();
      const imageInput = wrapper.get("input[id='file']");
      imageInput.setValue("");
      const form = wrapper.get("form");
      form.trigger("submit");
      expect(onSubmit).toHaveBeenCalled();
    });
  });
  describe("When the description is entered", () => {
    test("Then it should adjust its size", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { addDream: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(FormComponent, {
        global: {
          plugins: [router, store],
        },
        stubs: ["router-link", "router-view"],
      });

      const adjustSize = jest.fn();
      adjustSize();
      const description = wrapper.get("textarea");
      await description.setValue("hola");

      expect(adjustSize).toHaveBeenCalled();
    });
  });

  describe("When the delete button is clicked", () => {
    test("Then it should invoke onDelete", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { deleteDream: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(FormComponent, {
        global: {
          plugins: [router, store],
        },
        data() {
          return {
            isDetail: true,
          };
        },
        mocks: {
          $route: {
            params: {
              id: "123",
            },
          },
          onDelete: jest.fn(),
        },
        stubs: ["router-link", "router-view"],
      });

      const onDelete = jest.fn();
      onDelete();
      const deleteButton = wrapper.get("button[class='delete-button']");
      await deleteButton.trigger("click");

      expect(onDelete).toHaveBeenCalled();
    });
  });

  describe("When the update button is clicked", () => {
    test("Then it should invoke onEdit", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { updateDream: jest.fn(), checkToken: jest.fn() },
      });

      const wrapper = mount(FormComponent, {
        global: {
          plugins: [router, store],
          mocks: {
            $route: {
              params: {
                id: "123",
              },
            },
            onEdit: jest.fn(),
          },
        },
        data() {
          return {
            isDetail: true,
          };
        },

        stubs: ["router-link", "router-view"],
      });

      const onEdit = jest.fn();
      onEdit();
      const form = wrapper.get("form");
      form.trigger("submit");
      expect(onEdit).toHaveBeenCalled();
    });
  });
});
