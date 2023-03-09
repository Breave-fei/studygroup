<template>
  <div class="classMask">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="demo-ruleForm"
      label-width="80px"
      v-loading="loading"
    >
      <el-form-item label="班级编号" prop="id">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="班级名称" prop="classname">
        <el-input v-model="form.classname"></el-input>
      </el-form-item>
      <el-form-item label="教室" prop="classroom">
        <el-input v-model="form.classroom"></el-input>
      </el-form-item>
      <el-form-item label="开班时间" prop="startdate">
        <el-date-picker
          v-model="form.startdate"
          type="datetime"
          placeholder="选择日期时间"
        >
        </el-date-picker>
        <!-- <el-input v-model="form.startdate"></el-input> -->
      </el-form-item>
      <el-form-item label="班级状态" prop="classstate">
        <el-radio-group v-model="form.classstate">
          <el-radio label="未开班" value="未开班"></el-radio>
          <el-radio label="已开班" value="已开班"></el-radio>
          <el-radio label="已封班" value="已封班"></el-radio>
          <el-radio label="已结课" value="已结课"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="教师" prop="teacher">
        <el-select
          v-model="form.teacher"
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
        <el-input v-model="form.tphone" disabled></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="closeMask">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import { updateClass, getTeacher } from "@/api/axios/request";
import { setChinaDate } from "@/utils/date.js";
export default {
  props: ["classMaskData"],
  created() {
    // 获取教师的数据
    getTeacher({ type: "teacher" }).then((res) => {
      console.log("getTeacher", res);
      if (!res.errno) {
        this.teacherData = res.result;
      }
    });
    this.form = this.classMaskData;
    // 设置请求头信息
    this.headers = {
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  },
  data() {
    return {
      loading: false,
      headers: "",
      teacherData: [],
      form: {
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
      rules: {
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
      },
    };
  },
  methods: {
    closeMask() {
      // 触发父组件checkMask自定义事件，关闭遮罩层
      this.$emit("changeMask");
    },
    changeClassTeacher() {
      console.log("teacherData000", this.teacherData);
      let data = this.teacherData.filter((item) => {
        return item.name == this.form.teacher;
      });
      this.form.tphone = data[0].phone;
      this.form.tid = data[0].uid;
      // console.log("teacherData111", this.teacherData);
      // console.log("form", this.form);
    },
    onSubmit() {
      // 加载效果
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.form.startdate = setChinaDate(this.form.startdate);
          console.log("form", this.form);
          updateClass(this.form).then((res) => {
            this.loading = false;
            if (!res.errno) {
              console.log("updateClass", res);
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
.classMask {
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