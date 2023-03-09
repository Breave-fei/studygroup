<template>
  <div class="addUser">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input
          type="password"
          v-model="form.checkPwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <div class="sel">
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择用户类型">
            <el-option label="学员" value="user"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="教师" value="teacher"></el-option>
          </el-select>
        </el-form-item>
      </div>

      <div class="sel">
        <el-form-item label="头像" prop="userurl">
          <template slot-scope="scope">
            <!-- 上传图片时需要携带token, show-file-list是否显示已上传文件列表 -->
            <el-upload
              class="avatar-uploader"
              action="http://localhost:3000/api/uploaduserimg/"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="userurl"
                :src="userurl"
                width="100%"
                height="100%"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </template>
        </el-form-item>
        <template>
          <el-form-item label="缴费状态" prop="paystate">
            <el-select v-model="form.paystate" placeholder="请选择缴费状态">
              <el-option label="已缴费" value="已缴费"></el-option>
              <el-option label="未缴费" value="未缴费"></el-option>
            </el-select>
          </el-form-item>
        </template>
      </div>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="个人介绍" prop="introduce">
        <el-input type="textarea" v-model="form.introduce"></el-input>
      </el-form-item>
      <el-form-item class="sub">
        <el-button type="primary" @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addProduct } from "../api/axios/request";
export default {
  name: "AddUser",
  created() {
    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
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
    var validateType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择当前用户类型"));
      } else {
        callback();
      }
    };
    return {
      userurl: "",
      headers: "",
      form: {
        username: "",
        password: "",
        checkPwd: "",
        name: "",
        userurl: "",
        type: "",
        paystate: "",
        phone: "",
        sex: "",
        introduce: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "用户名称长度在 3 到 12 个字符之间",
            trigger: "blur",
          },
        ],
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
        type: [{ validator: validateType, trigger: "blur" }],
        phone: [
          { required: true, message: "请输入11位电话号码", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择用户性别", trigger: "blur" }],
        introduce: [
          {
            min: 2,
            max: 50,
            message: "个人简介长度在 2 到 50 个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 头像上传成功的回调
    handleAvatarSuccess(res, file) {
      this.userurl = URL.createObjectURL(file.raw);
      this.form.userurl = res.userurl;
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

    // 注册
    onSubmit() {
      // console.log("refs", this.$refs.form);
      this.$refs.form.validate((valid) => {
        if (valid) {
          let url = "/adduser";
          addProduct(url, this.form).then((res) => {
            // console.log("res");
            if (!res.errno) {
              // 添加成功的消息弹窗
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 使用Object.keys获取对象的key值，通过filter遍历key值清空form表单数据
              this.form = Object.keys(this.form).filter(
                (key) => (this.form[key] = "")
              );
              this.userurl = "";
            } else {
              this.$message({
                message: res.msg,
                type: "warning",
              });
            }
          });
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.addUser {
  width: 50%;
  position: relative;
  top: 0;
  left: 20%;

  .sel {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-form-item {
    margin-bottom: 15px;
  }
}

/* .el-form {
  text-align: left;
} */

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 2px dashed #d9d9d9;
}

.avatar-uploader {
  height: 100px;

  img {
    border: 2px dashed #d9d9d9;
    width: 100px;
    height: 100px;
  }
}
</style>