<template>
  <div class="enterClass">
    <div class="search">
      <span style="padding: 0px 2%; font-size: 18px">班级信息：</span>
      <template>
        <el-input
          v-model="searchData.search"
          size="medium "
          placeholder="请输入班级名称查询"
        />
      </template>
      <template>
        <el-radio v-model="searchData.classstate" label="已封班"
          >已封班</el-radio
        >
        <el-radio v-model="searchData.classstate" label="已结课"
          >已结课</el-radio
        >
        <el-radio v-model="searchData.classstate" label="已开班"
          >已开班</el-radio
        >
        <el-radio v-model="searchData.classstate" label="未开班"
          >未开班</el-radio
        >
      </template>
      <template>
        <el-select v-model="searchData.classname" filterable placeholder="教室">
          <el-option
            v-for="item in selectData"
            :key="item.cid"
            :label="item.classname"
            :value="item.classname"
          >
          </el-option>
        </el-select>
      </template>
      <template>
        <el-select
          v-model="searchData.teacher"
          filterable
          placeholder="请选择教师"
        >
          <el-option
            v-for="item in selectData"
            :key="item.cid"
            :label="item.teacher"
            :value="item.teacher"
          >
          </el-option>
        </el-select>
      </template>
      <template>
        <el-button icon="el-icon-search" @click="searchClass" type="primary"
          >查询</el-button
        >
        <el-button type="primary" @click="resetSearch" plain>重置</el-button>
      </template>
    </div>
    <template>
      <el-table
        v-loading="loading"
        style="width: 94%"
        :height="tableHeight"
        :data="setClassData()"
      >
        <el-table-column prop="id" label="编号" width="80"></el-table-column>
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
          width="100"
        ></el-table-column>
        <el-table-column
          prop="tphone"
          label="联系电话"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="startdate"
          label="开班时间"
          width="160"
        ></el-table-column>
        <el-table-column
          prop="classstate"
          label="班级状态"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="number"
          label="班级人数"
          width="80"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="240">
          <template slot="header" slot-scope="scope">
            操作
            <!-- <el-input v-model="search" size="mini" placeholder="请输入用户名搜索" /> -->
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >加入班级</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 底部分页 -->
    <div class="usersFooter">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        :page-size="pageSize"
        :current-page="page"
        @current-change="changeClassPage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getClassPage, updateUserClass } from "@/api/axios/request";
import ClassMask from "../components/mask/ClassMask.vue";
import AddClassMask from "../components/mask/AddClassMask.vue";
import { mapState } from "vuex";
export default {
  name: "enterClass",
  components: {
    ClassMask,
    AddClassMask,
  },
  created() {
    this.changeClassPage(this.page);
    // this.changeUsersPage(this.page);
    // 监听浏览器窗口变化
    window.addEventListener("resize", this.getHeight);
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      // select框数据
      selectData: [
        {
          id: "",
          classroom: "",
          teacher: "",
        },
      ],
      // 搜索框数据
      searchData: {
        cid: "",
        search: "",
        paystate: "",
        classname: "",
        classroom: "",
        classstate: "",
        startdate: "",
        teacher: "",
      },
      // 班级数据
      classData: [
        {
          id: 0,
          classname: "",
          classroom: "",
          tid: "",
          teacher: "",
          tphone: "",
          startdate: "",
          classstate: "",
          state: "",
        },
      ],
      // 编辑遮罩层判断
      flag: false,
      // 添加班级遮罩层判断
      addFlag: false,
      // 加载
      loading: false,
      // 每页显示条目数
      pageSize: 10,
      page: 1,
      // users数据的总条数
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
      this.changeClassPage(1);
    },
    // 点击搜索按钮搜索
    searchClass() {
      console.log("searchClass", this.searchData);
      let data = {
        page: 1,
        pageSize: this.pageSize,
        classname: this.searchData.classname,
        classstate: this.searchData.classstate,
        teacher: this.searchData.teacher,
      };
      getClassPage(data).then((res) => {
        // console.log("searchClass", res);
        if (!res.errno) {
          this.classData = res.result;
          this.count = res.resCount;
          Object.keys(this.searchData).filter((key) => {
            this.searchData[key] = "";
          });
        } else {
          alert(res.msg);
        }
        // this.setClassData();
      });
    },
    // 点击添加班级
    changeAddClassMask() {
      this.addFlag = true;
    },
    // 点击加入班级按钮
    handleEdit(index, row) {
      // 判断如果是管理员或者已加入班级禁止加入班级
      if (this.user.type == "admin") {
        this.$message.error("管理员无法加入班级");
      } else if (this.user.cid != null) {
        this.$message.error(
          "您已加入班级，如需加入其他班级。请先联系管理员或任课教师退出当前班级！然后再加入班级！"
        );
      } else {
        //   console.log("row", row);
        //   console.log("user", this.$store.state.user);
        let data = {
          id: this.user.id,
          cid: row.id,
          name: this.user.name,
          username: this.user.username,
          number: row.number,
        };
        updateUserClass(data).then((res) => {
          this.loading = false;
          if (!res.errno) {
            // 修改成功消息提示
            console.log("user", res.user);
            this.$store.commit("setUser", res.user);
            this.$message({
              message: res.msg,
              type: "success",
            });
            // 不支持push跳转当前路径，设置空白跳转路由，先跳转空白页然后跳转回来
            this.$router.push({ name: "RouterReplace" });
          } else {
            this.$message.error(res.msg);
          }
          console.log(res);
        });
      }
    },
    // 绑定自定义事件子组件触发，ClassMask显示隐藏
    changeMask() {
      this.flag = false;
      console.log("changeMask事件被触发");
    },

    // 绑定自定义事件子组件触发，AddClassMask显示隐藏
    changeAddMask() {
      this.addFlag = false;
      console.log("changeAddMask事件被触发");
    },
    // 分页切换页面
    changeClassPage(value) {
      let data = { page: value, pageSize: this.pageSize };
      getClassPage(data).then((res) => {
        console.log("changeClassPage", res);
        this.classData = res.result;
        this.selectData = res.result;
        this.count = res.resCount;
      });
    },
    setClassData() {
      return this.classData.filter(
        (data) =>
          !this.searchData.search ||
          data.classname
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
.enterClass {
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
      width: 15%;
      margin: 0 1%;
    }

    & > .el-radio {
      width: 4%;
      margin: 0 1%;
      margin-right: 0px;
    }

    & > .el-select {
      width: 9%;
      margin: 0 2%;
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