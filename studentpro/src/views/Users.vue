<template>
  <div class="users">
    <template>
      <el-table
        v-loading="loading"
        style="width: 94%"
        :height="tableHeight"
        :data="
          usersData.filter(
            (data) =>
              !search ||
              data.username.toLowerCase().includes(search.toLowerCase())
          )
        "
      >
        <el-table-column
          prop="username"
          label="账号"
          width="100"
        ></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="userurl" label="头像" width="42">
          <template slot-scope="scope">
            <img v-if="scope.row.userurl" :src="scope.row.userurl" alt="" />
            <!-- <img v-else="scope.row.userurl" src="../asssets/user.jpeg" alt="" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column
          prop="type"
          label="用户类型"
          width="100"
        ></el-table-column>
        <el-table-column prop="userstate" label="用户状态" width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.userstate"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeState(scope.$index, scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="160">
        </el-table-column>
        <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip -->
        <el-table-column
          prop="introduce"
          label="个人简介"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="请输入账号搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" @click="handlePwd(scope.$index, scope.row)"
              >修改密码</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >注销</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 用户管理编辑遮罩层 -->
    <users-mask v-if="flag" :user="user" @changeMask="changeMask"></users-mask>
    <!-- 用户管理修改密码遮罩层 -->
    <password-mask
      v-if="pwdFlag"
      :user="user"
      @changePwdMask="changePwdMask"
    ></password-mask>
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
import { updateProduct, getProduct, delProduct } from "@/api/axios/request";
import UsersMask from "../components/mask/UsersMask.vue";
import PasswordMask from "../components/mask/PasswordMask .vue";

export default {
  components: {
    UsersMask,
    PasswordMask,
  },
  created() {
    // // 获取用户数据
    // let url = "/api/getusers";
    // let data = { page: 1, pageSize: 10 };
    // getProduct(url, data).then((res) => {
    //   this.usersData = res.result;
    //   this.usersCount = res.resCount;
    // });
    this.changeUsersPage(this.page);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.getHeight);
  },
  data() {
    return {
      search: "",
      // 当前点击图书数据局
      user: {},
      // 编辑遮罩层判断
      flag: false,
      pwdFlag: false,
      // 加载
      loading: false,
      // 每页显示条目数
      pageSize: 8,
      page: 1,
      // users数据的总条数
      usersCount: 8,
      tableHeight: window.innerHeight - 145 + "px",
      usersData: [
        {
          username: "",
          name: "",
          password: "",
          checkPwd: "",
          userurl: "",
          type: "",
          userstate: "",
          phone: "",
          sex: "",
          introduce: "",
        },
      ],
    };
  },
  methods: {
    //获取浏览器高度减去顶部导航栏
    getHeight() {
      this.tableHeight = window.innerHeight - 145 + "px";
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 修改用户状态
    changeState(index, rows) {
      // console.log("changeState", rows);
      let url = "/api/changestate";
      let data = {
        id: rows.id,
        userstate: rows.userstate,
      };
      // console.log(data);
      updateProduct(url, data).then((res) => {
        // console.log(res);
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
    },
    // 修改密码
    handlePwd(index, row) {
      // 当前点击元素index索引，row元素内容
      //   console.log(index, row);
      this.user = row;
      this.pwdFlag = true;
    },
    // 编辑按钮
    handleEdit(index, row) {
      // 当前点击元素index索引，row元素内容
      //   console.log(index, row);
      this.user = row;
      this.flag = true;
    },
    // 删除用户
    handleDelete(index, row) {
      // 当前点击元素index索引，row元素内容
      // console.log(index, row);
      // 加载效果
      this.loading = true;
      this.$confirm("此操作将注销该用户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let url = "/api/deleteuser";
          delProduct(url, row.id).then((res) => {
            this.loading = false;
            if (!res.errno) {
              // 修改成功消息提示
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 不支持push跳转当前路径
              // this.router.push("/books");
              this.$router.go(0);
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
    // 绑定自定义事件子组件触发，bookMask显示隐藏
    changeMask() {
      this.flag = false;
      // console.log("changeMask事件被触发");
    },
    // 绑定自定义事件子组件触发，passwordMask显示隐藏
    changePwdMask() {
      this.pwdFlag = false;
      // console.log("changePwdMask事件被触发");
    },
    // 分页切换页面
    changeUsersPage(value) {
      // console.log(value);
      // 发送请求获取分页数据;
      let url = "/getusers";
      let data = { page: value, pageSize: this.pageSize };
      getProduct(url, data).then((res) => {
        this.usersData = res.result;
        this.usersCount = res.resCount;
        // console.log("getProduct",res);
      });
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.getHeight);
  },
  watch: {
    search: {
      deep: true, // 是否开启深度监视
      immediate: true, // 初始化时是否执行handler
      handler(newValue, oldValue) {
        // 把props中的数据传递给data（直接操作props数据会报错）
        clearTimeout("timer");
        if (this.search) {
          // console.log(this.search);
          let data = {
            search: this.search,
            page: this.page,
            pageSize: this.pageSize,
          };
          let timer = setTimeout(() => {
            getProduct("/getusersearchdata", data).then((res) => {
              // console.log(res);
              this.usersData = res.result;
              this.usersCount = res.resCount;
            });
          }, 500);
        } else {
          this.changeUsersPage(this.page);
        }
      },
    },
  },
};
</script>

<style lang="scss">
.users {
  width: 100%;
  height: calc(100vh - 120px);
  position: relative;

  .el-table {
    position: absolute;
    top: 0;
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
      max-height: 50px;
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
    bottom: 0px;

    // background-color: pink;
    .el-pagination {
      width: 60%;
      text-align: center;
      padding: 10px;
    }
  }

  .el-table th.el-table__cell > .cell {
    padding-left: 7px;
    padding-right: 7px;
    width: 100%;
  }
}
</style>