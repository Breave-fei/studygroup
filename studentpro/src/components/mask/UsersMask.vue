<template>
  <div class="usersMask">
    <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" label-width="80px" v-loading="loading">
      <el-form-item label="用户ID" prop="uid">
        <el-input v-model="form.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="userurl">
        <template slot-scope="scope">
          <!-- 上传图片时需要携带token, show-file-list是否显示已上传文件列表 -->
          <el-upload class="avatar-uploader" action="http://localhost:3000/api/uploaduserimg/" :headers="headers"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="userurl" :src="userurl" width="100%" height="100%" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </template>
      </el-form-item>
      <el-form-item label="用户类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择用户类型">
          <el-option label="学员" value="user"></el-option>
          <el-option label="管理员" value="admin"></el-option>
          <el-option label="教师" value="teacher"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人介绍" prop="introduce">
        <el-input type="textarea" v-model="form.introduce"></el-input>
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
    this.userurl = this.user.userurl;
    // 设置请求头信息
    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  },
  data() {
    return {
      loading: false,
      headers: "",
      userurl: "",
      form: {
        username: "",
        name: "",
        userurl: "",
        type: "",
        phone: "",
        sex: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "用户名称长度在 2 到 10 个字符之间",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择注册用户类型", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入11位电话号码", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择用户性别", trigger: "blur" }],
        introduce: [
          { required: true, message: "请输入个人简介", trigger: "blur" },
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
    // 上传成功的回调
    handleAvatarSuccess(res, file) {
      // console.log(res);
      // console.log(file);
      this.userurl = URL.createObjectURL(file.raw);
      this.form.userurl = res.userurl;
    },
    // 图片上传校验
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

    closeMask() {
      // 触发父组件checkMask自定义事件，关闭遮罩层
      this.$emit("changeMask");
    },
    onSubmit() {
      // 加载效果
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          console.log(this.form);
          let url = "/updateuser";
          updateProduct(url, this.form).then((res) => {
            this.loading = false;
            if (!res.errno) {
              // 修改成功消息提示
              this.$message({
                message: res.msg,
                type: "success",
              });
              // 触发父组件checkMask自定义事件，关闭遮罩层
              this.$emit("changeMask");
            } else {
              this.$message.error(res.msg);
            }
            console.log(res);
          });
        } else {
          console.log('error submit!!!');
          return false;
        }
      });




    },
  },
};
</script>

<style lang ="scss" scoped>
.usersMask {
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