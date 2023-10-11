import {
  NavigationGuardNext,
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import Login from "@/views/Login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Callback from "@/views/Callback.vue";
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
    component: HelloWorld,
    name: "Layout",
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
