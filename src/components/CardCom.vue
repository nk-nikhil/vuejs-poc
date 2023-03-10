<template>
  <section>
    <div
      class="cardItem"
      :class="selectedListColor === true ? 'selectRow' : ''"
    >
      <li>
        {{ listValue }}
      </li>
      <span @click.prevent="goToDetailPage">Go to detail screen</span>
      <!-- <span>{{ detailsValue }}</span> -->
      <div v-if="role === 'admin' || role === 'Supervisor'">
        <button @click.prevent="editSelectedItem">Edit</button>
        <button @click.prevent="removeItemId">Remove</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["listValue", "id", "role", "detailsValue"],
  $emits: ["set-remove-val", "set-edit-val"],
  data() {
    return {
      // selectedListColor: false,
    };
  },
  methods: {
    removeItemId() {
      console.log(this.id);
      this.$emit("set-remove-val", this.id, this.listValue);
    },
    editSelectedItem() {
      this.selectedListColor = !this.selectedListColor;
      this.$emit(
        "set-edit-val",
        this.id,
        this.listValue,
        this.selectedListColor
      );
    },
    goToDetailPage() {
      // this.$emit("get-details-val", this.id, this.listValue, this.detailsValue);
      window.location = `/details:${this.id}`;
    },
  },
};
</script>