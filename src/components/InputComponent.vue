<template>
  <section>
    <form
      v-if="role === 'admin'"
      @submit.prevent="postData"
      class="insertInput"
    >
      <input type="text" placeholder="Enter Values" v-model="inputValue" />
      <input type="text" placeholder="Enter Details" v-model="detailsValue" />
      <button type="submit">Post</button>
    </form>
  </section>
</template>

<script>
export default {
  props: ["role"],
  $emits: ["set-input-val"],
  data() {
    return {
      id: 0,
      inputValue: "",
      detailsValue: "",
    };
  },
  methods: {
    postData() {
      //   this.id = Math.random().toString(16).slice(2);

      
      this.$emit("set-input-val", this.inputValue, this.detailsValue, this.id += 1);
      console.log(this.inputValue, this.id, this.detailsValue);
      this.inputValue = "";
      this.detailsValue = "";
    },
  },
};
</script>