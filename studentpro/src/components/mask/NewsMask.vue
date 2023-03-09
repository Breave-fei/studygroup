<template>
  <div class="newsMask">
    <!-- 公告管理 -->
    <el-form
      :model="newData"
      status-icon
      :rules="rules"
      ref="newData"
      label-width="100px"
      class="demo-newData"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          type="titleword"
          v-model="newData.title"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者/发布人" prop="publisher">
        <el-input v-model="newData.publisher"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-col :span="8">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="newData.createdate"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <my-ueditor
        ref="ue"
        :content="newData.content"
        aria-placeholder="请输入公告内容"
      ></my-ueditor>
      <div class="btn">
        <el-button type="primary" @click="submitForm('newData')"
          >修改</el-button
        >
        <el-button @click="closeMask">取消</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { updateNews } from "@/api/axios/request.js";
import { setChinaDate } from "@/utils/date.js";

import MyUeditor from "@/components/common/MyUeditor";
export default {
  props: ["news"],
  name: "NewsMask",
  components: {
    MyUeditor,
  },
  data() {
    var checkpublisher = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入作者或发布人！"));
      }
      callback();
    };
    var validatetitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题！"));
      }
      callback();
    };
    return {
      // artInfo: {
      //   article_info: "",
      // },
      newData: this.news,
      rules: {
        title: [{ validator: validatetitle, trigger: "blur" }],
        publisher: [{ validator: checkpublisher, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$refs.ue.contents 获取html文本内容
          // 获取带格式文本内容

          this.newData.content = this.$refs.ue.contents;
          this.newData.createdate = setChinaDate(this.newData.createdate);
          // this.newData.createdate = new date.getDate();
          console.log("newData", this.newData);

          updateNews(this.newData).then((res) => {
            // console.log(res);
            if (!res.errno) {
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
            this.$emit("changeMask");
          });
          // console.log(this.$refs.ue.contents);
          // alert(this.$refs.ue.contents);
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeMask() {
      this.$emit("changeMask");
    },
  },
};
</script>

<style lang="scss" scoped>
.newsMask {
  width: 100%;
  height: 100%;
  min-height: 820px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba($color: #000000, $alpha: 0.5);
  .el-form {
    width: 90%;
    height: 85%;
    padding: 2%;
    position: relative;
    top: 3%;
    left: 5%;
    background-color: #fff;
    .myUeditor {
      max-height: 400px;
      margin: 0px 2%;
    }
    .btn {
      margin-top: 1%;
      margin-left: 10%;
    }
  }
}
</style>