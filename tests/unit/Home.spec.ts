import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Home from "../../src/views/Home.vue";
import state from "../mockState";
import NavBar from "@/components/NavBar.vue";
import DreamPreview from "@/components/DreamPreview.vue";
import Moon from "@/components/Moon.vue";

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

describe("Given a Home component", () => {
  describe("When is rendered", () => {
    test("Should render the div html tag with a class Home", async () => {
      const store = createStore({
        state() {
          return state;
        },
        actions: { checkToken: jest.fn(), getDreamsFromApi: jest.fn() },
      });

      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
        },
        components: {
          NavBar,
          Moon,
          DreamPreview,
          "font-awesome-icon": FontAwesomeIcon,
        },
        stubs: ["router-link", "router-view"],
      });
      await router.isReady();
      expect(wrapper.html()).toContain('<div class="home">');
    });
  });
  describe("When is rendered when the viewport is not mobile, and the user clicks on logout", () => {
    test("Then it should call logout()", async () => {
      const store = createStore({
        state() {
          const stateMobile = state;
          stateMobile.isMobile = true;
          return stateMobile;
        },
        actions: { logoutUser: jest.fn(), checkToken: jest.fn(), getDreamsFromApi: jest.fn() },
      });

      const $router = {
        push: jest.fn(),
      };
      const $route = {
        push: jest.fn(),
      };

      const wrapper = mount(Home, {
        global: {
          plugins: [router, store],
          mocks: {
            $route,
            $router,
          },
        },
        components: {
          NavBar,
          Moon,
          DreamPreview,
          "font-awesome-icon": FontAwesomeIcon,
        },
        stubs: ["router-link", "router-view", "FontAwesomeIcon"],
      });
      await router.isReady();

      const logoutButton = wrapper.get(
        "svg[class='svg-inline--fa fa-sign-out-alt fa-w-16 sign-out']"
      );
      await logoutButton.trigger("click");
      await router.isReady();
      expect(wrapper.html()).toContain('<div class="home">');
    });
  });
});
