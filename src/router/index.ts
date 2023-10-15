import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/components/Home.vue";
import Callback from "@/views/Callback.vue";
import Library from "@/views/Library.vue";
import helpers from "@/support/helpers";

const isLogged = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const { accessToken, expireTime } = helpers.getLocalStorage();
  const currentTimestamp = Date.now();
  if (!accessToken || !expireTime || Number(expireTime) < currentTimestamp) {
    next({ name: "Login" });
  }
  next();
};

const routes = [
  {
    path: "/",
    beforeEnter: isLogged,
    component: Home,
    name: "Layout",
  },
  {
    path: "/library",
    beforeEnter: isLogged,
    component: Library,
    name: "Library",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
