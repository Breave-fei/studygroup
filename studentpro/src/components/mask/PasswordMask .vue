<template>
  <div class="passwordMask">
    <el-form ref="form" :model="form" :rules="rules" :ref="form" class="demo-ruleForm" label-width="80px"
      v-loading="loading">
      <el-form-item label="用户名" prop="username">
        <el-input disabled v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="form.checkPwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="closeMask">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateProduct } from "@/api/axios/request";
export default {
  // 接收传递的book数据
  props: ["user"],
  created() {
    // console.log("create", this.book);
    this.form = this.user;
  },
  data() {
    // 自定义校验规则
    var validatePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        // username:"",
        // password: "",
        // checkPwd: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "用户密码长度在 3 到 12 个字符之间",
            trigger: "blur",
          },
        ],
        checkPwd: [{ validator: validatePwd, trigger: "blur" }],
      },
    };
  },
  methods: {
    closeMask() {
      // 触发父组件checkMask自定义事件，关闭遮罩层
      this.$emit("changePwdMask");
    },
    onSubmit() {
      // 加载效果
      this.loading = true;
      console.log(this.form);
      let url = "/api/updatepassword";
      updateProduct(url, this.form).then((res) => {
        this.loading = false;
        if (!res.errno) {
          // 修改成功消息提示
          this.$message({
            message: res.msg,
            type: "success",
          });
          // 触发父组件checkMask自定义事件，关闭遮罩层
          this.$emit("changePwdMask");
        } else {
          this.$message.error(res.msg);
        }
        console.log(res);
      });
    },
  },
};
</script>

<style lang ="scss" scoped>
.passwordMask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba($color: #000000, $alpha: 0.5);
}

.el-form {
  width: 50%;
  top: 50%;
  left: 50%;
  padding: 2%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  position: relative;
  background-color: #fff;

  .btn {
    margin-left: 18%;
  }
}

/* .el-form {
  text-align: left;
} */
</style>