<template>
  <div class="studentsMask">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="demo-ruleForm"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="学员ID" prop="uid">
        <el-input v-model="form.uid" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="缴费状态" prop="paystate">
        <el-radio-group v-model="form.paystate">
          <el-radio label="已缴费" value="已缴费"></el-radio>
          <el-radio label="未缴费" value="未缴费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择班级" prop="classname">
        <el-select
          v-model="form.classname"
          @change="changeUserClass"
          placeholder="请选择班级"
        >
          <el-option
            v-for="item in classData"
            :label="item.classname"
            :value="item.classname"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教室" prop="classroom">
        <el-input v-model="form.classroom" disabled></el-input>
      </el-form-item>
      <el-form-item label="教师" prop="teacher">
        <el-input v-model="form.teacher" disabled></el-input>
      </el-form-item>
      <el-form-item label="开班时间" prop="classstartdate">
        <el-input v-model="form.classstartdate" disabled></el-input>
      </el-form-item>
      <el-form-item label="班级状态" prop="classstate">
        <el-input v-model="form.classstate" disabled></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="closeMask">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import { getClass, updateUserClass } from "@/api/axios/request";
export default {
  // 接收传递的book数据
  props: ["students"],
  created() {
    getClass()
      .then((res) => {
        if (!res.errno) {
          // 处理班级数据未开班和已开班的班级可以加入，已节课和已封班的班级不可选
          this.classData = res.classData.filter((item) => {
            return item.state != "已结课" && item.state != "已封班";
          });
          // console.log(this.classData);
        }
      })
      .catch((err) => {
        throw err;
      });
    this.form = this.students;
    this.form.oldCid = this.students.cid;
    this.form.oldNumber = this.students.number;
    this.userurl = this.students.userurl;
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
      classData: [],

      form: {
        oldcid: "",
        uid: 0,
        cid: 0,
        name: "",
        userurl: "",
        paystate: "",
        sex: "",
        classname: "",
        classroom: "",
        teacher: "",
        classstartdate: "",
        classstate: "",
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
        phone: [
          { required: true, message: "请输入11位电话号码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    closeMask() {
      // 触发父组件checkMask自定义事件，关闭遮罩层
      this.$emit("changeMask");
    },
    changeUserClass() {
      let data = this.classData.filter((item) => {
        return item.classname == this.form.classname;
      });
      // // 双层循环遍历改变数据
      // for (let formKey of Object.keys(this.form)) {
      //     for (let classKey of Object.keys(data[0]))
      //         // console.log(formKey, classKey);
      //         if (formKey == classKey) {
      //             this.form[formKey] = data[0][classKey]
      //         }
      // }
      // console.log(this.form);
      this.form.cid = data[0].id;
      this.form.classname = data[0].classname;
      this.form.classroom = data[0].classroom;
      this.form.teacher = data[0].teacher;
      this.form.classstartdate = data[0].startdate;
      this.form.classstate = data[0].classstate;
    },
    onSubmit() {
      // 加载效果
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          // console.log(this.form);
          updateUserClass(this.form).then((res) => {
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
          console.log("error submit!!!");
          return false;
        }
      });
    },
  },
};
</script>
  
<style lang ="scss" scoped>
.studentsMask {
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