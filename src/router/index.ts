import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/Index.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import DreamForm from "../views/DreamForm.vue";
import WorkInProgress from "../views/WorkInProgress.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Index",
    component: Index,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        props: true,
      },
      {
        path: "/dream-form",
        name: "DreamForm",
        component: DreamForm,
        props: true,
        children: [
          {
            path: "/",
            name: "DreamForm",
            component: DreamForm,
            props: true,
          },
          {
            path: "/dream-form/:id",
            name: "DreamDetail",
            component: DreamForm,
          },
        ],
      },
    ],
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
  {
    path: "/statistics",
    name: "WIP",
    component: WorkInProgress,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
