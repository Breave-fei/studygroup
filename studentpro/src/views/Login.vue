<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <h1>登录</h1>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select
          v-model="ruleForm.type"
          @change="changeType"
          placeholder="请选择用户类型"
        >
          <el-option label="学员" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="教师" value="teacher"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <router-link to="/routerreplace">去空白跳转页面</router-link> -->
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    // 校验规则函数
    var validateUser = (rule, value, callback) => {
      if (!value) {
        // 判断当前输入为空
        return callback(new Error("用户名不能为空"));
      } else if (!/^\w{3,12}$/.exec(value)) {
        // 正则判断6-12位数字字母下划线
        return callback(new Error("用户名为3-12位数字字母下划线"));
      }
      callback();
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^\w{3,12}$/.exec(value)) {
        // 正则判断6-12位数字字母下划线
        return callback(new Error("密码为3-12位数字字母下划线"));
      }
      callback();
    };
    return {
      loginData: {},
      ruleForm: {
        username: "admin",
        password: "admin",
        type: "",
      },
      // 规则
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    /* 
      点击按钮时，要跟后端验证格式是否正确
      封装或引入axios请求
      添加登录请求
      在login中调用登录的请求
    */
    changeType() {
      // this.$store.state.type = this.ruleForm.type;
      sessionStorage.setItem("type", this.ruleForm.type);
      // console.log(this.$store.state.type);
    },
    submitForm(formName) {
      // this.$store.state.type = this.ruleForm.type
      // console.log(this.$store.state.type);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("setRouter");
          this.$store.dispatch("toLogin", this.ruleForm);
        } else {
          // 规则校验失败
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 10px;
}

.login {
  position: fixed;
  width: 500px;
  height: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(91, 40, 152);
  /* 浏览器不支持时显示 */
  background-image: linear-gradient(#c3d66e, hsl(228, 83%, 41%));

  & > .demo-ruleForm {
    padding: 10% 15% 10% 5%;
    color: black;
  }
}
</style>