import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import DreamForm from "../views/DreamForm.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dream-form",
    name: "DreamForm",
    component: DreamForm,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
