<template>
  <div class="students">
    <div class="search">
      <span style="padding: 0px 3%; font-size: 18px">学员信息：</span>
      <template>
        <el-input
          v-model="searchData.search"
          size="medium "
          placeholder="请输入用户名搜索"
        />
      </template>
      <template>
        <el-radio v-model="searchData.paystate" label="已缴费">已缴费</el-radio>
        <el-radio v-model="searchData.paystate" label="未缴费">未缴费</el-radio>
      </template>
      <template>
        <el-select
          v-model="searchData.classname"
          filterable
          placeholder="请选择班级"
        >
          <el-option
            v-for="item in classData"
            :key="item.cid"
            :label="item.classname"
            :value="item.classname"
          >
          </el-option>
        </el-select>
      </template>
      <template>
        <el-button icon="el-icon-search" @click="searchStu" type="primary"
          >查询</el-button
        >
        <el-button type="primary" @click="resetSearch" plain>重置</el-button>
      </template>
    </div>
    <template>
      <!-- <el-table v-loading="loading" style="width: 94%" :height="tableHeight" :data="
                usersData.filter(
                    (data) =>
                        !searchData.search ||
                        data.name.toLowerCase().includes(searchData.search.toLowerCase())
                )
            "> -->
      <el-table
        v-loading="loading"
        style="width: 94%"
        :height="tableHeight"
        :data="setUserData()"
      >
        <el-table-column
          prop="uid"
          label="学员ID"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="userurl" label="头像" width="42">
          <template slot-scope="scope">
            <img v-if="scope.row.userurl" :src="scope.row.userurl" alt="" />
            <!-- <img v-else="scope.row.userurl" src="../asssets/user.jpeg" alt="" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120"></el-table-column>
        <el-table-column
          prop="classname"
          label="班级"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="classroom"
          label="教室"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="teacher"
          label="任课教师"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="paystate"
          label="缴费状态"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="classstartdate"
          label="开班时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="classstate"
          label="班级状态"
          width="120"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="260">
          <template slot="header" slot-scope="scope">
            操作
            <!-- <el-input v-model="search" size="mini" placeholder="请输入用户名搜索" /> -->
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleOutClass(scope.$index, scope.row)"
              >退出班级</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 学员信息编辑遮罩层 -->
    <students-mask
      v-if="flag"
      :students="students"
      @changeMask="changeMask"
    ></students-mask>
    <!-- 底部分页 -->
    <div class="usersFooter">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="usersCount"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changeUsersPage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {
  getClass,
  getProduct,
  outClass,
  getStuSearchData,
} from "@/api/axios/request";
import StudentsMask from "../components/mask/StudentsMask.vue";

export default {
  name: "Students",
  components: {
    StudentsMask,
  },
  created() {
    this.changeUsersPage(this.page);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.getHeight);
    // 获取班级数据
    getClass()
      .then((res) => {
        if (!res.errno) {
          // console.log("getClass", res);
          // this.classData = res.classData;
          res.classData.filter((item) => {
            this.classData.push({ classname: item.classname, cid: item.id });
            return item;
          });
          this.classData.push({ classname: "无班级", cid: "" });
          // console.log("change", this.classData);
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  data() {
    return {
      // search: "",
      searchData: {
        search: "",
        paystate: "",
        classname: "",
        cid: "",
      },
      // 班级数据
      classData: [],
      // 当前点击图书数据局
      students: {},
      // 编辑遮罩层判断
      flag: false,
      pwdFlag: false,
      // 加载
      loading: false,
      // 每页显示条目数
      pageSize: 10,
      page: 1,
      // users数据的总条数
      usersCount: 10,
      tableHeight: window.innerHeight - 145 + "px",
      usersData: [
        {
          uid: 0,
          cid: 0,
          username: "",
          name: "",
          password: "",
          userurl: "",
          userstate: "",
          paystate: "",
          phone: "",
          sex: "",
          introduce: "",
          type: "",
          classname: "",
          classroom: "",
          teacher: "",
          classstartdate: "",
          classstate: "",
        },
      ],
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
      this.changeUsersPage(1);
    },
    // 点击搜索按钮搜索
    searchStu() {
      // console.log("searchStu", this.searchData);
      if (this.searchData.classname == "无班级") {
        this.searchData.classname = "";
        this.searchData.cid = "0";
      }
      // console.log("classData", this.classData);
      this.classData.filter((item) => {
        if (item.classname == this.searchData.classname) {
          this.searchData.cid = item.cid;
        }
      });
      // this.classData;
      let data = {
        search: this.searchData.search,
        page: this.page,
        pageSize: this.pageSize,
        type: "user",
        paystate: this.searchData.paystate,
        cid: this.searchData.cid,
      };
      getStuSearchData(data).then((res) => {
        if (!res.errno) {
          // console.log("search", res);
          this.usersData = res.result;
          this.usersCount = res.resCount;
          Object.keys(this.searchData).filter((key) => {
            this.searchData[key] = "";
          });
        } else {
          alert(res.msg);
        }
      });
      // this.setData();
    },
    // 编辑按钮
    handleEdit(index, row) {
      // console.log("row", row);
      this.students = row;
      this.flag = true;
    },
    // 删除用户
    handleOutClass(index, row) {
      this.loading = true;
      this.$confirm("此操作将退出当前班级, 请问是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          outClass(row.id).then((res) => {
            // console.log("outClass", res);
            this.loading = false;
            if (!res.errno) {
              // 修改成功消息提示
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 不支持push跳转当前路径，设置空白跳转路由，先跳转空白页然后跳转回来
              this.$router.push({ name: "RouterReplace" });
              // this.$router.go(0);
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 绑定自定义事件子组件触发，StudentsMask显示隐藏
    changeMask() {
      this.flag = false;
      // console.log("changeMask事件被触发");
    },
    // 分页切换页面
    changeUsersPage(value) {
      // console.log(value);
      // 发送请求获取分页数据;
      let url = "/getusers";
      let data = { page: value, pageSize: this.pageSize, type: "user" };
      getProduct(url, data).then((res) => {
        if (!res.errno) {
          this.usersData = res.result;
          // console.log(this.$store.state.userData);
          this.usersCount = res.resCount;
          // console.log("change", res);
        }
      });
    },
    setUserData() {
      return this.usersData.filter(
        (data) =>
          !this.searchData.search ||
          data.name.toLowerCase().includes(this.searchData.search.toLowerCase())
      );
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  // computed: {
  //     setData() {
  //         return this.usersData.filter((data) => !this.searchData.search || data.name.toLowerCase().includes(this.searchData.search.toLowerCase()))
  //     }
  // },
  // watch: {
  //     search: {
  //         deep: true, // 是否开启深度监视
  //         immediate: true, // 初始化时是否执行handler
  //         handler(newValue, oldValue) {
  //             // 把props中的数据传递给data（直接操作props数据会报错）
  //             clearTimeout("timer");
  //             if (this.search) {
  //                 console.log(this.search);
  //                 let data = {
  //                     search: this.search,
  //                     page: this.page,
  //                     pageSize: this.pageSize,
  //                     type: "user",
  //                     paystate: this.searchData.paystate,
  //                     cid: this.searchData.cid,
  //                 };
  //                 let timer = setTimeout(() => {
  //                     getStuSearchData(data).then((res) => {
  //                         console.log("search", res);
  //                         this.usersData = res.result;
  //                         this.usersCount = res.resCount;
  //                     });
  //                     // getProduct("/getusersearchdata", data).then((res) => {
  //                     //     console.log("search", res);
  //                     //     this.usersData = res.result;
  //                     //     this.usersCount = res.resCount;
  //                     // });
  //                 }, 500);
  //             } else {
  //                 this.changeUsersPage(this.page);
  //             }
  //         },
  //     },
  // },
};
</script>



<style lang="scss">
.students {
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;

  .search {
    width: 94%;
    height: 8%;
    margin: 0px 3%;
    display: flex;
    // justify-content: center;
    align-items: center;
    line-height: 8%;
    background-color: #fff;

    & > .el-input {
      width: 30%;
      margin: 0 2%;
    }

    & > .el-radio {
      width: 6%;
      margin: 0 2%; // margin: 0 2%;
      margin-right: 0px;
    }

    & > .el-select {
      width: 10%;
      margin: 0 4%;
    }

    & > .el-button {
      margin: 0px 1%;
    }
  }

  .el-table {
    max-height: calc(100% - 13%);
    position: absolute;
    top: 60px;
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
      max-height: 48px;
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
      // padding: 0 10px;
    }
  }

  .el-table th.el-table__cell > .cell {
    padding-left: 7px;
    padding-right: 7px;
    width: 100%;
  }
}
</style>