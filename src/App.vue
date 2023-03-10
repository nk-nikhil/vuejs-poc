<style>
@import "./styles/main.css";
</style>

<template>
  <div>
    <active-user :username="user.name" :userage="user.pwd"></active-user>
    <main>
      <router-view></router-view>
    </main>
    <!-- <user-data @set-data="setUserData"> </user-data> -->
    <!-- <register-page></register-page> -->
    <!-- <router-view><router-view/> -->
  </div>
</template>

<script>
import ActiveUser from "./components/ActiveUser.vue";
export default {
  components: {
    ActiveUser,
  },
  data() {
    return {
      user: {
        name: "",
        pwd: "",
      },
    };
  },
  methods: {
    setUserData(name, pwd) {
      this.user = {
        name: name,
        pwd: +pwd,
      };
    },
  },
};
</script>