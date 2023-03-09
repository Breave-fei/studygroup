<template>
  <div class="details">
    <div class="above">
      <el-card class="box-card myCard" shadow="always">
        <p>个人资料：</p>
        <div class="myCard-content">
          <ul>
            <li class="first">
              <!-- <img :src="user.userurl" alt="头像" /> -->
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/api/uploaduserimg/"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="userData.userurl"
                  :src="userData.userurl"
                  width="100%"
                  height="100%"
                  class="avatar"
                />
                <el-button v-else type="text">上传头像</el-button>
              </el-upload>
            </li>
            <li>
              <div class="li-left el-icon-user-solid">账号：</div>
              <div class="li-right">{{ userData.username }}</div>
            </li>
            <li>
              <div class="li-left el-icon-s-custom">姓名：</div>
              <div class="li-right">{{ userData.name }}</div>
            </li>
            <li>
              <div class="li-left el-icon-connection">性别：</div>
              <div class="li-right">{{ userData.sex }}</div>
            </li>
            <li>
              <div class="li-left el-icon-phone">联系电话：</div>
              <div class="li-right">{{ userData.phone }}</div>
            </li>
            <li>
              <div class="li-left el-icon-postcard">个人编号：</div>
              <div class="li-right">{{ userData.uid }}</div>
            </li>
            <li v-if="userData.classname">
              <div class="li-left el-icon-s-home">班级：</div>
              <div class="li-right">{{ userData.classname }}</div>
            </li>
            <li v-if="userData.cid">
              <div class="li-left el-icon-open">缴费状态：</div>
              <div class="li-right">{{ userData.paystate }}</div>
            </li>
            <li>
              <div class="li-left el-icon-s-promotion">用户类型：</div>
              <div class="li-right">{{ userData.type }}</div>
            </li>
          </ul>
        </div>
      </el-card>
      <el-card class="box-card changeCard" shadow="always">
        <p>
          <span
            :class="spanFlag ? 'spanActive' : 'none'"
            @click="changeSpanActive(spanFlag)"
            >基本资料</span
          >
          <span
            :class="!spanFlag ? 'spanActive' : 'none'"
            @click="changeSpanActive(!spanFlag)"
            >修改密码</span
          >
        </p>

        <div class="changeCard-content">
          <el-form
            :model="userData"
            :rules="rules"
            ref="userData"
            label-width="100px"
            class="demo-userData"
          >
            <el-form-item v-show="!spanFlag" label="账号" prop="username">
              <el-input v-model.number="userData.username" disabled></el-input>
            </el-form-item>
            <el-form-item v-show="!spanFlag" label="密码" prop="password">
              <el-input
                type="password"
                v-model="userData.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item v-show="!spanFlag" label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="userData.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item v-show="spanFlag" label="个人编号" prop="uid">
              <el-input v-model="userData.uid"></el-input>
            </el-form-item>
            <el-form-item v-show="spanFlag" label="姓名" prop="name">
              <el-input v-model="userData.name"></el-input>
            </el-form-item>
            <el-form-item v-show="spanFlag" label="性别" prop="sex">
              <el-radio-group v-model="userData.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="spanFlag" label="联系电话" prop="phone">
              <el-input v-model="userData.phone"></el-input>
            </el-form-item>
            <el-form-item v-show="spanFlag" label="缴费状态" prop="paystate">
              <el-input
                v-if="userData.paystate != '未缴费'"
                v-model="userData.paystate"
                disabled
              ></el-input>
              <template v-else>
                {{ userData.paystate }}
                <el-button @click="toPay" type="text">前往缴费</el-button>
              </template>
            </el-form-item>
            <el-form-item v-show="spanFlag" label="用户类型" prop="type">
              <el-select
                v-if="userData.type != '学员'"
                v-model="userData.type"
                placeholder="请选择用户类型"
              >
                <el-option label="学员" value="user"></el-option>
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="教师" value="teacher"></el-option>
              </el-select>
              <el-input v-else v-model="userData.type" disabled></el-input>
            </el-form-item>
            <el-form-item class="sub">
              <el-button type="primary" @click="submitForm('userData')"
                >保存</el-button
              >
              <el-button @click="resetForm('userData')">重置</el-button>
            </el-form-item>
          </el-form>
          <!-- <el-form
            :model="passwordData"
            status-icon
            :rules="rules"
            ref="passwordData"
            label-width="100px"
            class="demo-passwordData"
          >
            <el-form-item label="密码" prop="password">
              <el-input
                type="password"
                v-model="passwordData.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="passwordData.checkPass"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="username">
              <el-input
                v-model.number="passwordData.username"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitPasswordForm('passwordData')"
                >提交</el-button
              >
              <el-button @click="resetForm('passwordData')">重置</el-button>
            </el-form-item>
          </el-form> -->
        </div>
      </el-card>
    </div>
    <div class="lower">
      <p>个人简介：</p>
      <!-- <p>{{}}</p> -->
      <p v-show="introduceFlag" @click="changeIntroduceFlag" class="introduce">
        {{ userData.introduce }}
      </p>
      <!--  -->
      <textarea
        v-show="!introduceFlag"
        name="introduce"
        ref="introduce"
        @blur="updateUserIntroduce"
        @keyup.enter="updateUserIntroduce"
        v-model="userData.introduce"
        class="introduce"
        rows="5"
      ></textarea>
    </div>
  </div>
</template>
<script>
import { updateUser } from "@/api/axios/request.js";
import { mapState } from "vuex";
export default {
  name: "Details",
  computed: {
    ...mapState(["user"]),
  },
  created() {
    console.log("created", this.user);
    // 深拷贝一份user数据
    this.userData = JSON.parse(JSON.stringify(this.user)); // 复制用户信息给用户数据
    // this.passwordData = JSON.parse(JSON.stringify(this.user)); // 复制用户信息给密码数据
    if (!this.userData.paystate) {
      this.userData.paystate = "未缴费";
    }
    if (this.userData.type == "user") {
      this.userData.type = "学员";
    } else if (this.userData.type == "teacher") {
      this.userData.type = "教师";
      this.userData.paystate = "教师无需缴费";
    } else if (this.userData.type == "admin") {
      this.userData.type = "管理员";
      this.userData.paystate = "管理员无需缴费";
    }

    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  },
  data() {
    // 自定义校验规则
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("个人编号不能为空！"));
      } else if (value.length < 2 || value.length > 10) {
        callback(new Error("个人编号长度在2-10个字符之间"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("手机号不能为空！"));
      } else if (value.length != 11) {
        callback(new Error("手机号长度为11位"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      headers: {},
      userData: {},
      // passwordData: {},
      introduceFlag: true,
      userData: {},
      spanFlag: true,
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        name: [
          { required: true, message: "请输入姓名！", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        type: [
          {
            type: "string",
            required: true,
            message: "请选择一个类型",
            trigger: "change",
          },
        ],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log("sub", this.userData);
          if (this.userData.type == "学员") {
            this.userData.type = "user";
          } else if (this.userData.type == "教师") {
            this.userData.type = "teacher";
            this.userData.paystate = "";
          } else if (this.userData.type == "管理员") {
            this.userData.type = "admin";
            this.userData.paystate = "";
          }
          updateUser(this.userData).then((res) => {
            console.log("updateUser", res);
            if (!res.errno) {
              // 添加成功的消息弹窗
              this.$store.commit("setUser", res.user);
              this.userData = res.user;
              this.$message({
                message: res.msg,
                type: "success",
              });
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // submitPasswordForm() {},
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 头像上传成功的回调
    handleAvatarSuccess(res, file) {
      this.userData.userurl = URL.createObjectURL(file.raw);
      this.userData.userurl = res.userurl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 改变个人介绍的展示
    changeIntroduceFlag() {
      this.introduceFlag = !this.introduceFlag;
      // $nextTick页面渲染后执行获取元素焦点
      this.$nextTick(() => {
        this.$refs.introduce.focus();
      });
    },
    // 变换右侧展示内容
    changeSpanActive(spanFlag) {
      // console.log(spanFlag);
      if (!spanFlag) {
        this.spanFlag = !this.spanFlag;
      }
    },

    // 修改个人介绍
    updateUserIntroduce() {
      // 判断是否
      if (this.userData.introduce.length > 250) {
        this.userData.introduce = this.userData.introduce.slice(0, 250);
        this.$message("超过200字个人介绍字数限制,多余字数已删除！");
      }
      if (this.userData.introduce != this.user.introduce) {
        console.log("触发事件改变introduce");
        this.introduceFlag = true;
      } else {
        console.log("只改变introduce展示");
        this.introduceFlag = true;
      }
    },
    // 点击前往缴费
    toPay() {
      this.$alert(
        "<strong>请联系任课教师<i style='color:red;'>缴纳学费</i>加入班级</strong>",
        "HTML 片段",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
  },
};
</script>
<style lang="scss">
.el-card {
  /* border: 1px solid #ebeef5; */
  border: 0px;
  .el-card__body {
    width: 100%;
    height: 100%;
    padding: 0px;
  }
}
</style>

<style lang="scss" scoped>
.details {
  padding: 2% 1%;
  width: 98%;
  height: 100%;
  // background-color: azure;
  .above {
    width: 100%;
    height: 80%;
    margin-bottom: 1%;
    // background-color: #fff;
    display: flex;
    color: #ffc0cb;
    p {
      //   height: ;
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      background-color: #dcdfe6;
      font-size: 16px;
      & > span {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        width: 10%;
        height: 100%;
        padding: 0px 1%;
      }
      & > .spanActive {
        border-radius: 10% 10% 0 0;
        color: #409eff;
        background-color: #fff;
      }
    }
    .myCard {
      width: 24%;
      height: 100%;
      margin-right: 1%;
      .myCard-content {
        width: 100%;
        height: 100%;
        // background-color: pink;
        ul {
          width: 100%;
          height: 100%;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-height: 7%;
            font-size: 14px;
            color: #676a6c;
            margin: 2% 5%;
            border-bottom: 1px solid #dcdfe6;
            // .el-divider--horizontal {
            //   margin: 6px 0px;
            // }
            .li-left {
              float: left;
            }
            .li-right {
              float: right;
            }
          }
        }
        .first {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 110px;
          padding-top: 5%;
          margin: 0px;
          padding: 2% 3%;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
          .el-button {
            padding: 5px;
          }
        }
      }
    }
    .changeCard {
      width: 75%;
      height: 100%;
      .el-form {
        width: 90%;
        height: 100%;
        margin-top: 3%;
        .el-form-item {
          margin-bottom: 2%;
        }
      }
    }
  }
  .lower {
    width: 100%;
    height: 22%;
    padding: 2%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    p {
      width: 10%;
    }
    .introduce {
      width: 90%;
      height: 90%;
      resize: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>