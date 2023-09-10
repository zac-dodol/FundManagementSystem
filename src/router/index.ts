import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import fundView from "../views/fundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/fund/:fund",
      name: "fundView",
      component: fundView,
      meta: {
        title: "Fund",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.fundes}, ${to.params.state}` : to.meta.title
  } | Fund Management System`;
  next();
});

export default router;
