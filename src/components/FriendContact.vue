<template>
  <li>
    <h2>{{ name }}</h2>
    <button @click="toggleDetails">
      {{ detailsAreVisible ? "Hide" : "Show" }} Details
    </button>
    <ul v-if="detailsAreVisible">
      <li><strong> Phone : </strong>{{ phoneNumber }}</li>
      <li><strong>Email : </strong> {{ email }}</li>
    </ul>
  </li>
</template>
<script>
export default {
  props: ["name", "phoneNumber", "email", "isFavorite"],
  data() {
    return {
      detailsAreVisible: false,
      //   friend: {
      //     id: "01",
      //     name: "Nikhil",
      //     phone: "1211231211",
      //     email: "nikhil@localhost.com",
      //   },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },
  },
};
</script>