<template>
  <div class="manage">
    <el-container>
      <my-aside :isCollapse="isCollapse"></my-aside>
      <el-container>
        <!-- <el-aside width="200px"> </el-aside> -->
        <el-header><my-header></my-header></el-header>
        <el-main>
          <!-- 面包屑区域 -->
          <div class="mbx">
            <!-- 导航栏伸展 -->
            <i class="el-icon-menu" @click="changeCollapse"> </i>
            <!-- 面包屑（breadcrumb 面包屑数据） -->
            <my-breadcrumb
              :breadcrumb="breadcrumb"
              @delBreadcrumb="delBreadcrumb"
            ></my-breadcrumb>
          </div>
          <div class="main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MyHeader from "@/components/common/MyHeader.vue";
import MyAside from "../components/common/MyAside.vue";
import MyBreadcrumb from "../components/common/MyBreadcrumb.vue";

export default {
  name: "Manage",
  components: {
    MyAside,
    MyBreadcrumb,
    MyHeader,
  },
  data() {
    return {
      isCollapse: false,
      // 面包屑
      breadcrumb: [],
    };
  },
  created() {
    this.breadcrumb.push({
      path: this.$route.fullPath,
      title: this.$route.meta.title,
      isActive: "active",
    });
  },
  // computed: {
  //   ...mapState(["breadcrumb"]),
  // },
  // mounted() {
  // updated() {
  beforeUpdate() {
    // console.log(this.$route);
    // 获取历史点击数据（刷新页面路由需要去除）
    // console.log("去重前", this.breadcrumb);
    if (this.$route.fullPath != "/manage/routerreplace") {
      this.breadcrumb.push({
        path: this.$route.fullPath,
        title: this.$route.meta.title,
        isActive: "active",
      });
    }

    // 过滤修改isActive
    this.breadcrumb = this.breadcrumb.filter((item) => {
      if (this.$route.fullPath == item.path) {
        item.isActive = "active";
      } else {
        item.isActive = "none";
      }
      return item;
    });
    // 数组对象去重
    let map = new Map();
    for (let item of this.breadcrumb) {
      if (!map.has(item.path)) {
        map.set(item.path, item);
      }
    }
    this.breadcrumb = [...map.values()];
    // console.log("去重后", this.breadcrumb);
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
      // console.log(this.isCollapse);
    },
    // 自定义事件触发的回调，实现面包屑数据过滤删除
    delBreadcrumb(path) {
      //   判断当前点击删除是否为当前路由
      // console.log("my", this.$route.fullPath);
      if (this.$route.fullPath == path) {
        // 获取当前路径下标
        let pathIndex = this.breadcrumb.findIndex((item) => item.path === path);
        // let dirPath = this.breadcrumb[this.breadcrumb.length - 1].path; // 跳转到最后一个
        // this.$router.push(`${dirPath}`);
        if (pathIndex == 0 || pathIndex != this.breadcrumb.length - 1) {
          let dirPath = this.breadcrumb[this.breadcrumb.length - 1].path; // 跳转到最后一个
          // let dirPath = this.breadcrumb[pathIndex + 1].path;
          this.$router.push(`${dirPath}`);
        } else {
          let dirPath = this.breadcrumb[this.breadcrumb.length - 2].path; // 跳转到倒数第二个
          // let dirPath = this.breadcrumb[pathIndex - 1].path; // 跳转到前一个
          this.$router.push(`${dirPath}`);
        }
      }
      if (this.breadcrumb.length > 1) {
        //过滤数组中对应的元素
        // console.log("my", path);
        this.breadcrumb = this.breadcrumb.filter((item) => {
          // console.log(item);
          return item.path != path;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.myAside {
  background-color: #545c64;
  color: #333;
  // text-align: center;
  /* 最小高度，calc可以进行计算 */
  min-height: calc(100vh - 60px);
}

.el-main {
  width: 100%;
  padding: 0;
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  min-height: calc(100vh - 60px);

  .main {
    width: 100%;
    // min-height: calc(100vh - 60px);
    height: 95%;
    padding: 10px 20px;
  }
}

.mbx {
  width: 100%;
  height: 30px;
  line-height: 30px;
  // text-align: center;
  // background-color: pink;
  overflow: hidden;
  display: flex;

  & > i {
    height: 30px;
    margin: 0 20px 0 10px;
    line-height: 30px;
    font-size: 25px;
    background-color: #e9eef3;
  }
}
</style>