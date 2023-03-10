import { createApp } from "vue";
import App from "./App.vue";
import FriendContact from "./components/FriendContact.vue";
import UserData from "./components/UserData.vue";
import ActiveUser from "./components/ActiveUser.vue";
import RegisterPage from "./components/RegisterPage.vue";
import DashboardPage from "./components/DashboardPage.vue";
import DetailPage from "./components/DetailPage.vue";

import { createRouter, createWebHistory } from "vue-router";
const app = createApp(App);

app.component("friend-contact", FriendContact);
app.component("active-user", ActiveUser);

app.component("user-data", UserData);
app.component("register-page", RegisterPage);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: UserData,
    },
    {
      path: "/register",
      component: RegisterPage,
    },
    {
      path: "/dashboard",
      component: DashboardPage,
    },
    {
      path: "/details:id",
      component: DetailPage,
    },
  ],
});

// app.component("active-user", ActiveUser);

app.use(router);

app.mount("#app");
