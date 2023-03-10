<template>
  <section>
    <h3 class="headerText">
      Congratulation for login Successfully on
      <b style="color: red"> {{ this.roleFromUrl }} </b> dashboard
    </h3>
    <button @click="logOutFun" class="logOut">Log Out</button>
    <div class="roleBasedBox">
      <input-component
        :role="roleFromUrl"
        @set-input-val="childToParentData"
      ></input-component>
      <button v-if="roleFromUrl === 'admin'" @click="getPostDetailsList">
        Press to get latest Data
      </button>
      <card-com
        @set-remove-val="getRemoveItemId"
        @set-edit-val="childToParentEditData"
        v-for="data in dataList"
        :key="data.id"
        :id="data.id"
        :listValue="data.item"
        :detailsValue="data.details"
        :role="roleFromUrl"
        :selectedListColor="selectedListColor"
      ></card-com>
      <div v-if="editFlag">
        <input
          type="text"
          :placeholder="this.valueToBeModified"
          v-model="newValueToBeModified"
        />
        <!-- :placeholder="this.valueToBeModified" -->

        <button @click="updateEditValue">Update</button>
      </div>
    </div>
  </section>
</template>

<script>
import CardCom from "./CardCom.vue";
import InputComponent from "./InputComponent.vue";
import axios from "axios";

let urlDb = "http://localhost:5000/";
let registerPath = "api/v1/details";

export default {
  components: { InputComponent, CardCom },
  // props: {
  //   inputValue: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      dataList: [],
      id: null,
      editFlag: false,
      valueToBeModified: "",
      idToBeModified: null,
      newValueToBeModified: "",
      roleFromUrl: "",
      selectedListColor: "",
    };
  },
  methods: {
    childToParentData(inputValue, detailsValue) {
      // http://localhost:5000/api/v1/details

      const params = {
        id: this.dataList.length + 1,
        item: inputValue,
        details: detailsValue,
      };
      axios
        .post(urlDb + registerPath, params)
        .then((response) => {
          if (response.status === 201) {
            alert("Data inserted Sucessfully");
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
          if (error.response.status === 400) {
            alert("Something went wrong! Please try again");
          }
        });
      // this.id = this.dataList.length + 1;
      // this.dataList.push({
      //   id: this.id,
      //   item: inputValue,
      //   details: detailsValue,
      // });
      // console.log(this.dataList);
    },
    getRemoveItemId(id) {
      console.log(id);
      const url = urlDb + registerPath + `/${id}`;
      axios
        .delete(url)
        .then((response) => {
          // this.getDetails = response.data.details;
          console.log(response);
          if (response.status === 200) {
            alert("Data deleted Sucessfully");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
      // const resIndex = this.dataList.findIndex((res) => res.id === id);
      // this.dataList.splice(resIndex, 1);

      console.log(this.dataList);
    },
    childToParentEditData(id, listValue) {
      this.valueToBeModified = listValue;
      this.idToBeModified = id;
      console.log(id + " " + " " + listValue);
      this.editFlag = true;
      this.selectedListColor = !this.selectedListColor;
    },
    updateEditValue() {
      const index = this.dataList.findIndex((obj) => {
        return obj.id === this.idToBeModified;
      });
      this.dataList[index].item = this.newValueToBeModified;
      this.editFlag = false;
      this.selectedListColor = !this.selectedListColor;
      console.log(this.dataList);
    },
    getParamValue() {
      const userStr = localStorage.getItem("roles");
      const user = JSON.parse(userStr);

      const { role } = user;

      // let x = window.location.href;
      // var role = x.split(":")[3];
      this.roleFromUrl = role;
    },
    logOutFun() {
      localStorage.removeItem("roles");
      window.location = "/";
    },
    getPostDetailsList() {
      axios
        .get(urlDb + registerPath)
        .then((response) => {
          console.log(response.data.details);
          this.dataList = response.data.details;
          // this.dataList.push(response.data.details);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    },
  },
  beforeMount() {
    this.getParamValue();
    this.getPostDetailsList();
  },
};
</script>