<template>
  <div class="newsList">
    <div class="search">
      <span style="font-size: 18px">新闻列表：</span>
      <template>
        <el-input
          v-model="searchData.search"
          size="medium "
          placeholder="请输入新闻/公告标题查询"
        />
      </template>
      <template> 按时间查询 </template>
      <template>
        <el-button icon="el-icon-search" @click="searchNews" type="primary"
          >查询</el-button
        >
        <el-button type="primary" @click="resetSearch" plain>重置</el-button>
      </template>
      <!-- <template>
        <span
          class="el-icon-plus"
          @click="changeAddClassMask"
          style="color: #409eff"
          >添加班级</span
        >
      </template> -->
    </div>
    <template>
      <el-table
        v-loading="loading"
        style="width: 94%"
        :height="tableHeight"
        :data="setNewsData()"
      >
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="title"
          label="标题"
          width="240"
        ></el-table-column>
        <el-table-column
          prop="createdate"
          label="发布时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="publisher"
          label="作者/发布人"
          width="100"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="content"
          label="内容"
          width="360"
        ></el-table-column>

        <!-- <el-table-column
          prop="classstate"
          label="班级状态"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="班级人数"
          width="80"
        ></el-table-column> -->
        <el-table-column fixed="right" label="操作" width="240">
          <template slot="header" slot-scope="scope">
            操作
            <!-- <el-input v-model="search" size="mini" placeholder="请输入用户名搜索" /> -->
          </template>
          <template slot-scope="scope">
            <el-button
              @click="handleNewsDetails(scope.$index, scope.row)"
              type="text"
              >详情</el-button
            >
            <template v-if=""> </template>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >

            <el-button
              size="mini"
              type="danger"
              @click="handleDelNews(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 班级管理编辑遮罩层 -->
    <!-- <class-mask
      v-if="flag"
      :newsMaskData="newsMaskData"
      @changeMask="changeMask"
    ></class-mask> -->
    <!-- 班级管理添加班级遮罩层 -->
    <!-- <add-class-mask
      v-if="addFlag"
      @changeAddMask="changeAddMask"
    ></add-class-mask> -->

    <!-- 底部分页 -->
    <div class="usersFooter">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changeNewsPage"
      >
      </el-pagination>
    </div>
    <!-- 新闻详情页 -->
    <news-detail-mask
      v-if="detailFlag"
      :news="newsMaskData"
      @changeDetailMask="changeDetailMask"
    ></news-detail-mask>
    <news-mask
      v-if="flag"
      :news="newsMaskData"
      @changeMask="changeMask"
    ></news-mask>
  </div>
</template>

<script>
import { getNewsPage, delNews } from "@/api/axios/request";
import NewsDetailMask from "../components/mask/NewsDetailMask.vue";
import NewsMask from "../components/mask/NewsMask.vue";

// import ClassMask from "../components/mask/ClassMask.vue";
// import AddClassMask from "../components/mask/AddClassMask.vue";

export default {
  name: "NewsList",
  components: {
    NewsDetailMask,
    NewsMask,
    //   ClassMask,
    //   AddClassMask,
  },
  created() {
    this.changeNewsPage(this.page);
    // this.changeUsersPage(this.page);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.getHeight);
  },
  data() {
    return {
      // 搜索框数据
      searchData: {
        id: null,
        title: null,
        publisher: null,
        content: null,
        createdate: null,
        state: null,
      },
      // 新闻数据
      newsData: [
        {
          id: null,
          title: null,
          publisher: null,
          content: null,
          createdate: null,
          state: null,
        },
      ],
      // 编辑遮罩层判断
      flag: false,
      // 编辑遮罩层判断
      detailFlag: false,
      // 当前新闻数据
      newsMaskData: null,
      // 加载
      loading: false,
      // 每页显示条目数
      pageSize: 10,
      page: 1,
      // news数据的总条数
      count: 0,
      tableHeight: window.innerHeight - 145 + "px",
    };
  },
  methods: {
    //获取浏览器高度减去顶部导航栏
    getHeight() {
      this.tableHeight = window.innerHeight - 145 + "px";
    },
    // 重置搜索
    resetSearch() {
      Object.keys(this.searchData).filter((key) => {
        this.searchData[key] = "";
        return key;
      });
      //   this.changeUsersPage(1);
      this.changeNewsPage(1);
    },
    // 点击搜索按钮搜索
    searchNews() {
      // console.log("searchNews", this.searchData);
      // //   let data = {
      // //     page: 1,
      // //     pageSize: this.pageSize,
      // //     classname: this.searchData.classname,
      // //     classstate: this.searchData.classstate,
      // //     teacher: this.searchData.teacher,
      // //   };
      // getNewsPage(data).then((res) => {
      //   // console.log("searchNews", res);
      //   if (!res.errno) {
      //     this.newsData = res.result;
      //     this.count = res.resCount;
      //     Object.keys(this.searchData).filter((key) => {
      //       this.searchData[key] = "";
      //     });
      //   } else {
      //     alert(res.msg);
      //   }
      //   // this.setnewsData();
      // });
    },
    // 点击详情按钮
    handleNewsDetails(index, row) {
      this.detailFlag = !this.detailFlag;
      this.newsMaskData = row;
    },
    // 编辑按钮
    handleEdit(index, row) {
      //   console.log("row", row);
      this.newsMaskData = row;
      this.flag = true;
    },
    // 删除班级
    handleDelNews(index, row) {
      this.loading = true;
      this.$confirm("此操作将删除当前班级, 请问是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delNews(row.id).then((res) => {
            console.log("delNews", res);
            this.loading = false;
            if (!res.errno) {
              // 修改成功消息提示
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 不支持push跳转当前路径，设置空白跳转路由，先跳转空白页然后跳转回来
              this.$router.push({ name: "RouterReplace" });
            } else {
              this.$message.error(res.msg);
            }
          });
          //   // console.log("delClass", row);
          //   delClass(row.id).then((res) => {
          //     // console.log("delClass", res);
          //     this.loading = false;
          //     if (!res.errno) {
          //       // 修改成功消息提示
          //       this.$message({
          //         message: res.msg,
          //         type: "success",
          //       });
          //       // 不支持push跳转当前路径，设置空白跳转路由，先跳转空白页然后跳转回来
          //       this.$router.push({ name: "RouterReplace" });
          //     } else {
          //       this.$message.error(res.msg);
          //     }
          //   });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 绑定自定义事件子组件触发，NewsMask显示隐藏
    changeDetailMask() {
      this.detailFlag = !this.detailFlag;
      console.log("changeMask事件被触发");
    },
    changeMask() {
      this.flag = !this.flag;
      console.log("changeMask事件被触发");
    },

    changeNewsPage(value) {
      let data = { page: value, pageSize: this.pageSize };
      getNewsPage(data).then((res) => {
        console.log("changeNewsPage", res);
        if (!res.errno) {
          this.newsData = res.result;
          this.selectData = res.result;
          this.count = res.resCount;
        } else {
          this.newsData = [];
          this.selectData = {};
        }
      });
    },
    setNewsData() {
      return this.newsData.filter(
        (data) =>
          !this.searchData.search ||
          data.title
            .toLowerCase()
            .includes(this.searchData.search.toLowerCase())
      );
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
};
</script>



<style lang="scss">
.newsList {
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;

  .search {
    width: 94%;
    height: 12%;
    margin: 0px 3%;
    display: flex;
    // justify-content: center;
    align-items: center;
    line-height: 12%;
    background-color: #fff;

    & > .el-input {
      width: 25%;
      margin: 0 1%;
    }

    & > .el-radio {
      width: 6%;
      // margin: 0 1%;
      margin-right: 0px;
    }

    & > .el-select {
      width: 10%;
      margin: 0 1%;
    }

    & > .el-button {
      margin: 0px 1%;
    }

    & > span {
      margin: 0px 1%;
    }
  }

  .el-table {
    max-height: calc(100% - 18%);
    position: absolute;
    top: 13%;
    left: 3%;

    th {
      .cell {
        height: 36px;
        line-height: 36px;
      }
    }

    th,
    td {
      padding: 8px 0;
    }

    .el-table__row {
      max-height: 45px;
    }

    .cell {
      text-align: center;
      padding: 0px;
      line-height: 100%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }

  .usersFooter {
    position: absolute;
    width: 94%;
    height: 35px;
    left: 3%;
    bottom: -20px;

    // background-color: pink;
    .el-pagination {
      width: 60%;
      text-align: center;
    }
  }

  .el-table th.el-table__cell > .cell {
    padding-left: 7px;
    padding-right: 7px;
    width: 100%;
  }
}
</style>