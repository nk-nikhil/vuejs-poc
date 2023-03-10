<template>
  <section>
    <form @submit.prevent="submitData" id="container">
      <h3 id="Heading">Sign In</h3>
      <label>Username:</label>
      <div class="row">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            width="100%"
          >
            <path
              d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
            />
          </svg>
        </div>
        <input
          type="email"
          name="email"
          placeholder="enter email"
          v-model="enteredEmail"
          required
        />
      </div>
      <label>Password:</label>
      <div class="row">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="30px"
          >
            <path
              d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
            />
          </svg>
        </div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="enteredPassword"
          required
        />
      </div>
      <br />
      <div v-if="this.login === false" class="loginFailed">
        User name or password is incorrect, Please try again
      </div>
      <button type="submit">Sign In</button>
      <span>
        <!-- <span><a href="">Forgot Password?</a></span> -->
        <span>Not a member? <a href="/register"> Sign Up</a></span></span
      >
    </form>
  </section>
</template>
<script>
import axios from "axios";
export default {
  // emits: ["set-data"],
  data() {
    return {
      enteredEmail: "",
      enteredPassword: "",

      // adminName: "admin",
      // adminPwd: "admin",

      // userName: "user",
      // userPwd: "user",

      // supName: "sup",
      // supPwd: "sup",
      login: null,
    };
  },
  methods: {
    submitData() {
      // this.$emit("set-data", this.enteredName, this.enteredPassword);
      console.log(this.enteredEmail, this.enteredPassword);
      const params = {
        email: this.enteredEmail,
        password: this.enteredPassword,
      };
      let urlDb = "http://localhost:5000/";
      let registerPath = "api/v1/auth/login";
      axios
        .post(urlDb + registerPath, params)
        .then((response) => {
          console.log(response.data.code);
          this.user = response.data.user;
          // alert("Sign-Up Successful, Re-directing to Sign-In page");
          // window.location = "/";
          if (response.data.code === 401 || response.data.code === 404) {
            this.login = false;
          }
          console.log(this.user);
          if (this.user.role !== "") {
            this.login = true;
            localStorage.setItem("roles", JSON.stringify(this.user));
            window.location = `/dashboard`;
            // window.location = `/admin-dashboard:${this.user.role}`;
          } else {
            this.login = false;
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
          console.error("Status code!", error.response.status);
          // if (error.response.status === 400 || error.response.status === 404) {
          //   alert("Something went wrong, Please try again");
          // }
        });

      // if (
      //   this.adminName === this.enteredName &&
      //   this.adminPwd === this.enteredPassword
      // ) {
      //   this.login = true;
      //   window.location = "/admin-dashboard";
      // } else if (
      //   this.userName === this.enteredName &&
      //   this.userPwd === this.enteredPassword
      // ) {
      //   this.login = true;
      //   window.location = "/user-dashboard";
      // } else if (
      //   this.supName === this.enteredName &&
      //   this.supPwd === this.enteredPassword
      // ) {
      //   this.login = true;
      //   window.location = "/supervisor-dashboard";
      // } else {
      //   this.login = false;
      // }
    },
  },
};
</script>