<template>
  <div id="vue-instance" class="form-group">
    <select required class="form-control" @change="changeCountry($event)">
      <option value="" selected disabled>Please Select</option>
      <option
        v-for="country in countries"
        :value="country.code"
        :key="country.code"
      >
        {{ country.name }}
      </option>
    </select>
    <br /><br />
    <!-- <p>
      <span>Selected country name: {{ selectedCountry }}</span>
    </p>
    <p>
      <span>User country: {{ user.address.country }}</span>
    </p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: [
        { code: "admin", name: "admin" },
        { code: "read-write", name: "Supervisor" },
        { code: "insert", name: "User" },
      ],
      selectedCountry: null,
      user: {
        address: {
          country: null,
        },
      },
    };
  },
  methods: {
    emits: ["set-dropdown-data"],
    changeCountry(event) {
      this.user.address.country = event.target.value;
      this.selectedCountry =
        event.target.options[event.target.options.selectedIndex].text;
      console.log(this.selectedCountry);
      this.$emit("set-dropdown-data", this.selectedCountry);
    },
  },
};
</script>