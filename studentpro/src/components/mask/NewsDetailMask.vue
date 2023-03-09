<template>
  <div class="newsDetailMask">
    <el-card class="box-card">
      <h3 class="el-icon-message-solid">{{ news.title }}</h3>
      <div v-html="news.content"></div>
      <i class="el-icon-error close" @click="closeMask" circle></i>
    </el-card>
    <!-- <el-button type="danger" icon="el-icon-error" circle></el-button> -->
  </div>
</template>
  
<script>
// import { updateClass, getTeacher } from "@/api/axios/request";
// import { setChinaDate } from "@/utils/date.js";
export default {
  props: ["news"],
  created() {
    console.log(this.news);
  },
  mounted() {},
  methods: {
    closeMask() {
      this.$emit("changeDetailMask");
    },
  },
};
</script>
  
<style lang ="scss" scoped>
.newsMask {
  width: 100%;
  height: 100%;
  min-height: 820px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .el-form {
    width: 90%;
    height: 85%;
    padding: 2%;
    position: relative;
    top: 3%;
    left: 5%;
    background-color: #fff;
  }
}
.newsDetailMask {
  width: 100%;
  height: 100%;
  min-height: 820px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .box-card {
    width: 90%;
    height: 85%;
    padding: 2%;
    position: relative;
    top: 3%;
    left: 5%;
    background-color: #fff;
    .close {
      z-index: 5;
      width: 20px;
      height: 20px;
      font-size: 20px;
      color: red;
      position: absolute;
      top: calc(100vh - 100%);
      right: 3%;
    }
  }
}
</style>