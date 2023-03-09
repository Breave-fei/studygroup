<template>
  <div class="myAside">
    <template v-if="!isCollapse">
      <img
        style="width: 200px; padding: 0 15px; height: 60px"
        src="@/assets/img/YCXS.jpg"
      />
    </template>
    <template v-else>
      <img style="height: 60px; border-radius: 50%" src="@/assets/img/YC.jpg" />
    </template>
    <div>
      <el-menu
        :default-active="asideCode"
        :unique-opened="true"
        :router="true"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <template v-for="item in routerData[0].children">
          <template v-if="item.children">
            <el-submenu :index="item.meta.linkTo" :key="item.name">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </template>
              <el-menu-item-group v-for="i in item.children" :key="i.name">
                <el-menu-item :index="i.meta.linkTo">
                  <i class="el-icon-user"></i><span>{{ i.meta.title }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item
              :index="item.meta.linkTo"
              :key="item.name"
              v-if="item.name != 'RouterReplace'"
            >
              <i class="el-icon-s-home"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // 初始化打开的菜单栏
    this.asideCode = this.$route.fullPath;
    // console.log(this.asideCode);
    this.routerData = JSON.parse(sessionStorage.getItem("routerData"));
    // console.log("routerData", this.routerData);
  },
  props: ["isCollapse"],
  data() {
    return {
      // 是否展开
      // isCollapse: false,
      // 导航栏编码
      asideCode: "",
      routerData: "",
    };
  },
  watch: {
    // 监听路由变化
    $route: {
      deep: true, // 是否开启深度监视
      immediate: true, // 初始化时是否执行handler
      handler(newValue, oldValue) {
        // 把props中的数据传递给data（直接操作props数据会报错）
        this.asideCode = this.$route.fullPath;
        // console.log(this.asideCode);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.myAside {
  // &>img {
  //   width: 92%;
  //   padding: 0 4%;
  //   height: 60px;
  // }

  .el-menu-item {
    height: 45px;
    line-height: 45px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-submenu {
  .el-menu-item {
    i {
      font-size: 12px;
    }

    .el-menu-item-group__title {
      padding: 2px 0 2px 20px;
    }

    font-size: 12px;
  }
}

.el-menu {
  border-right: 0px;
}
</style>