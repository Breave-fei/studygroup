<template>
  <div class="addClassMask">
    <el-form
      ref="form"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="班级名称" prop="classname">
        <el-input v-model="ruleForm.classname"></el-input>
      </el-form-item>
      <el-form-item label="教室" prop="classroom">
        <el-input v-model="ruleForm.classroom"></el-input>
      </el-form-item>
      <el-form-item label="开班时间" prop="startdate">
        <el-date-picker
          v-model="ruleForm.startdate"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班级状态" prop="classstate">
        <el-radio-group v-model="ruleForm.classstate">
          <el-radio label="未开班" value="未开班"></el-radio>
          <el-radio label="已开班" value="已开班"></el-radio>
          <el-radio label="已封班" value="已封班"></el-radio>
          <el-radio label="已结课" value="已结课"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教师" prop="teacher">
        <el-select
          v-model="ruleForm.teacher"
          @change="changeClassTeacher"
          placeholder="请选择教师"
        >
          <el-option
            v-for="item in teacherData"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="tphone">
        <el-input v-model="ruleForm.tphone" disabled></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="closeMask">取消</el-button>
      </el-form-item>
      <!--  -->
    </el-form>
  </div>
</template>
  
<script>
import { addClass, updateClass, getTeacher } from "@/api/axios/request";
import { setChinaDate } from "@/utils/date.js";
export default {
  created() {
    // 获取教师的数据
    getTeacher({ type: "teacher" }).then((res) => {
      console.log("getTeacher", res);
      if (!res.errno) {
        this.teacherData = res.result;
      }
    });
    this.form = this.students;
    // 设置请求头信息
    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  },
  data() {
    // 自定义校验规则
    var validateDate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择开班时间！"));
      } else {
        callback();
      }
    };
    var validateTeacher = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择教师！"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      headers: "",
      teacherData: [],
      ruleForm: {
        classname: "",
        classroom: "",
        tid: "",
        teacher: "",
        tphone: "",
        startdate: "",
        classstate: "",
        state: "",
      },
      rules: {
        startdate: [{ validator: validateDate, trigger: "blur" }],
        teacher: [{ validator: validateTeacher, trigger: "blur" }],
        classname: [
          { required: true, message: "请输入班级名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "班级名称长度在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
        classroom: [
          { required: true, message: "请输入教室名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "教室名称长度在 2 到 20 个字符之间",
            trigger: "blur",
          },
        ],
        state: [{ required: true, message: "请选择班级状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    closeMask() {
      // 触发父组件checkMask自定义事件，关闭遮罩层
      this.$emit("changeAddMask");
    },
    changeClassTeacher() {
      console.log("teacherData000", this.teacherData);
      let data = this.teacherData.filter((item) => {
        return item.name == this.ruleForm.teacher;
      });
      this.ruleForm.tphone = data[0].phone;
      this.ruleForm.tid = data[0].uid;
      // console.log("teacherData111", this.teacherData);
      // console.log("form", this.form);
    },
    onSubmit() {
      // 加载效果
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.ruleForm.startdate = setChinaDate(this.ruleForm.startdate);
          console.log("ruleForm", this.ruleForm);
          addClass(this.ruleForm).then((res) => {
            console.log("addclass", res);
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
.addClassMask {
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