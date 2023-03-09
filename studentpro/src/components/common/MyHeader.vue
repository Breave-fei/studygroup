<template>
  <div class="myHeader">
    <p>{{ userType }} -- {{ name }}，英才学社欢迎您！</p>
    <div class="pic">
      <img :src="user.userurl" @click="changeToDetails" alt="头像" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      userType: "",
    };
  },
  computed: {
    name() {
      return this.$store.state.user.name;
    },
  },
  mounted() {
    this.user = this.$store.state.user;
    if (this.user.type == "user") {
      this.userType = "学员";
    } else if (this.user.type == "admin") {
      this.userType = "管理员";
    } else if (this.user.type == "teacher") {
      this.userType = "教师";
    }
    // console.log("user用户数据", this.user.userurl);
  },
  methods: {
    changeToDetails() {
      // console.log(this.$route.fullPath);
      if (this.$route.fullPath != "/manage/details") {
        this.$router.push("/manage/details");
      } else {
        // 不支持push跳转当前路径，设置空白跳转路由，先跳转空白页然后跳转回来
        this.$router.push({ name: "RouterReplace" });
      }
    },
  },
};
</script>

<style lang="scss">
.myHeader {
  width: 80%;
  height: 60px;
  line-height: 60px;
  background-color: #b3c0d1;
  color: #333;

  p {
    font-size: 36px;
    text-shadow: 4px 4px 4px black, 0px 0px 1px black;
    color: rgb(235, 235, 235);
  }

  .pic {
    height: 60px;
    position: absolute;
    top: 0;
    right: 10px;
    // background-color: skyblue;

    & > img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
</style>