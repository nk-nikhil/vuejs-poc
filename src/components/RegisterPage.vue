<template>
  <section>
    <!-- <h2 v-if="this.dataError">Something went wrong!</h2> -->
    <form @submit.prevent="submitData" id="container">
      <h3 id="Heading">Register yourself</h3>
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
          type="text"
          name="username"
          placeholder="Enter Username"
          v-model="enteredName"
          required
        />
      </div>
      <label>Email:</label>
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
          placeholder="Enter email"
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
          placeholder="Enter Password"
          v-model="enteredPassword"
          required
        />
      </div>
      <label>Select Role:</label>
      <dropdown-event @set-dropdown-data="setDropdownData"></dropdown-event>
      <!-- <div v-if="this.login">Something went wrong, Please try again</div> -->
      <button type="submit">Register</button>
      <!-- <span
        ><span><a href="">Forgot Password?</a></span>
        <span>Not a member? <a href="/register"> Sign Up</a></span></span
      > -->
    </form>
  </section>
</template>


<script>
import DropdownEvent from "./DropdownEvent.vue";
import axios from "axios";
export default {
  components: { DropdownEvent },
  // props: {
  //   selectedRole: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      // a: "nikc",
      user: {
        enteredName: "",
        enteredEmail: null,
        enteredPassword: null,
        selectedRole: "",
        // dataError: false,
      },
      data: {},
    };
  },
  methods: {
    setDropdownData(selectedRole) {
      console.log(selectedRole + " asddsj");
      this.user = {
        selectedRole: selectedRole,
      };
    },
    submitData() {
      // this.user = {
      //   enteredName: this.enteredName,
      //   enteredEmail: this.enteredEmail,
      //   enteredPassword: this.enteredPassword,
      //   selectedRole: this.user.selectedRole,
      // };
      // debugger;
      // console.log(this.user)
      const params = {
        name: this.enteredName,
        email: this.enteredEmail,
        password: this.enteredPassword,
        role: this.user.selectedRole,
      };
      let urlDb = "http://localhost:5000/";
      let registerPath = "api/v1/auth/register";
      axios
        .post(urlDb + registerPath, params)
        .then((response) => {
          this.data = response.data;
          console.log(this.data.code);
          if (this.data.code === 200) {
            alert("Sign-Up Successful, Re-directing to Sign-In page");
            window.location = "/";
          } else if (this.data.code === 409) {
            alert("Something went wrong, Please try again");
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
          console.error("There was an error!", error);
          console.error("Status code!", error.response.status);
          if (error.response.status === 400 || error.response.status === 404) {
            alert("Something went wrong, Please try again");
          }
        });
    },
  },
};
</script>