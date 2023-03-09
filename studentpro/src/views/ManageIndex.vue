<template>
  <div class="manageIndex">
    <!-- 首页 -->
    <ul>
      <li>
        <!-- 柱状图 -->
        <div id="userBar" ref="userBar"></div>
      </li>
      <li>
        <!-- 饼状图 -->
        <!-- <div id="bookPie" ref="bookPie"></div> -->
      </li>
      <li>
        <!-- 点线图 -->
      </li>
      <li>
        <!-- 曲线图 -->
      </li>
    </ul>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getAllProduct } from "@/api/axios/request";
export default {
  created() {
    // console.log(this.option);
    // 发送请求获取echarts所需数据
    // 获取到的假数据
    // console.log("router", this.$router);
    // 获取用户echarts数据
    getAllProduct("/api/getuseroption").then((res) => {
      // console.log(res);
      // console.log(res.result);
      // this.userData = [...res.result];
      this.userOption = res.userOptionData;
      // console.log("赋值后", this.userOptionData);

      // this.userData = res.result;
      this.userBar.hideLoading();
      this.userBar.setOption(this.userOption);
    });

    // // 获取图书echarts数据
    // getAllProduct("/api/getbookoption").then((res) => {
    //   console.log(res);
    //   this.bookOption = res.bookOptionData;
    //   this.bookPie.hideLoading();
    //   this.bookPie.setOption(this.bookOption);
    // });

    // 监听窗口改变事件，重新计算echart尺寸
    window.addEventListener("resize", this.changeEchartsSize);
    // this.userBar.resize();
    // // myChart1.resize();
    // // myChart2.resize();
    // this.userBar.setOption(this.userOption);
  },
  data() {
    return {
      userOption: {},
      bookOption: {},
      userData: [], // 遍历后的user图表数据
      // userOptionData: {}, // echarts数据
    };
  },
  methods: {
    changeEchartsSize() {
      this.userBar.resize();
    },
  },
  mounted() {
    // console.log("触发了一次挂载....");
    // 基于准备好的dom，初始化echarts实例
    this.userBar = echarts.init(this.$refs.userBar);
    // 绘制图表
    this.userBar.setOption(this.userOption);
    // 数据加载
    this.userBar.showLoading();

    // // 基于准备好的dom，初始化echarts实例
    // this.bookPie = echarts.init(this.$refs.bookPie);
    // // 绘制图表
    // this.bookPie.setOption(this.bookOption);
    // // 数据加载
    // this.bookPie.showLoading();
  },
  destroyed() {
    // 销毁监听事件
    window.removeEventListener("resize", this.changeEchartsSize);
  },
};
</script>

<style lang="scss" scoped>
.manageIndex {
  width: 100%;
  height: 96%;

  ul {
    width: 100%;
    height: 100%;
    padding: 1%;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 48%;
      height: 46%;
      margin: 1%;
      padding: 0 2%;
      background-color: pink;
      border: 1px solid black;
    }
  }
}

#userBar {
  width: 100%;
  height: 100%;
}

#bookPie {
  width: 100%;
  height: 100%;
}
</style>