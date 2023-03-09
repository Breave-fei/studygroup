<template>
  <div class="myBreadcrumb">
    <ul>
      <li
        :class="item.isActive"
        @click="toRoute(item.path)"
        v-for="item of breadcrumbData"
        :key="item.path"
      >
        {{ item.title }}
        <i
          class="el-icon-circle-close"
          @click="deleteBreadcrumb(item.path)"
        ></i>
      </li>
    </ul>
    <div class="logout" @click="logout">退出</div>
  </div>
</template>

<script>
export default {
  props: { breadcrumb: Array },
  data() {
    return {
      breadcrumbData: [],
      //   breadcrumbData: [
      //     {
      //       path: "/manage/users",
      //       title: "管理学生",
      //     },
      //     {
      //       path: "/manage/adduser",
      //       title: "添加学生",
      //     },
      //   ],
    };
  },
  methods: {
    deleteBreadcrumb(path) {
      //   console.log(path);
      //   console.log(this.breadcrumb);

      //   判断最少保留一个页面
      if (this.breadcrumbData.length > 1) {
        // 触发事件由manage父组件过滤数组中对应的元素
        this.$emit("delBreadcrumb", path);
        // //过滤数组中对应的元素
        // this.breadcrumbData = this.breadcrumbData.filter((item) => {
        //   // console.log(item);
        //   return item.path != path;
        // });
      }
    },
    toRoute(path) {
      //   console.log(path);
      // console.log("toRoute", this.$route.fullPath);
      if (this.$route.fullPath != path) {
        // console.log(11);
        this.$router.push(path);
      }

      // if(this.route)
    },
    logout() {
      this.$router.push("/login");
    },
  },
  // watch 监听
  watch: {
    breadcrumb: {
      deep: true, // 是否开启深度监视
      immediate: true, // 初始化时是否执行handler
      handler(newValue, oldValue) {
        // 把props中的数据传递给data（直接操作props数据会报错）
        this.breadcrumbData = this.breadcrumb;
        // this.breadcrumb = [];
      },
    },
  },
};
</script>

<style lang="scss">
.myBreadcrumb {
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;

  ul {
    display: flex;
    width: 95%;
    height: 100%;
    border: 1px solid rgb(148, 17, 17);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(175, 37, 37, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    overflow: hidden;

    .active {
      background-color: rgba(172, 25, 25, 0.5);
    }

    li {
      width: 8%;
      min-width: 95px;
      height: 26px;
      line-height: 26px;
      overflow: hidden;
      border-radius: 8px;
      //   font-size: 18px;
      text-align: center;
      margin: 2px;
      padding: 1px;
      background-color: skyblue;
      position: relative;

      i {
        position: absolute;
        top: 0px;
        right: 10%;
        width: 5px;
        height: 5px;
        border-radius: 2px;
        color: red;
      }
    }
  }

  .logout {
    width: 80px;
    height: 100%;
    margin: auto;
    text-align: center;
    margin-right: 0;
    background-color: skyblue;
  }
}
</style>