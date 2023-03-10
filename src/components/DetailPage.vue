<template>
  <section>
    <!-- <h3 class="headerText">Welcome to Detail page</h3> -->
    <div style="padding-left: 1.2rem">
      <h3 style="color: green">{{ this.getDetails.item }}</h3>
      <h3 style="color: green">{{ this.getDetails.details }}</h3>
    </div>
    <h3 style="color: white" v-if="dataNotFound">No data available</h3>
  </section>
</template>

<script>
import axios from "axios";

let urlDb = "http://localhost:5000/";
let registerPath = "api/v1/details";

export default {
  data() {
    return {
      paramId: null,
      getDetails: [],
      dataNotFound: false,
    };
  },
  methods: {
    getDetailsInfoWithId() {
      const url = urlDb + registerPath + `/${this.paramId}`;
      axios
        .get(url)
        .then((response) => {
          this.getDetails = response.data.details;
        })
        .catch((error) => {
          console.error("There was an error!", error);
          if (error.response.status === 404) {
            this.dataNotFound = true;
          }
        });
    },
  },
  beforeMount() {
    let x = window.location.href;
    var getId = x.split(":")[3];
    this.paramId = getId;
    console.log(this.paramId);
    this.getDetailsInfoWithId();
  },
};
</script>