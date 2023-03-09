<template>
  <div class="addNews">
    <!-- 公告管理 -->
    <template>
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
        <my-ueditor
          ref="ue"
          :content="newData.content"
          aria-placeholder="请输入公告内容"
        ></my-ueditor>
        <el-form-item>
          <el-button type="primary" @click="submitForm('newData')"
            >提交</el-button
          >
          <el-button @click="resetForm('newData')">重置</el-button>
        </el-form-item>
      </el-form>
    </template>
    <!-- <my-ueditor
      ref="ue"
      :content="artInfo.article_info"
      aria-placeholder="请输入公告内容"
    ></my-ueditor> -->
    <!-- <u-editor></u-editor> -->
    <!-- <button @click="submitEditor">提交</button> -->
  </div>
</template>
<script>
import { addNews } from "@/api/axios/request.js";
import { getNewDate } from "@/utils/date.js";

import MyUeditor from "@/components/common/MyUeditor";
export default {
  name: "AddNews",
  components: {
    MyUeditor,
  },
  mounted() {
    // 编辑器中的数据
    // console.log("ue", this.$refs.ue);
    // this.$refs.ue.contents = "请输入公告内容...";
    // 显示后台返回的数据到编辑器;
    // this.$refs.ue.contents = this.contens
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
      newData: {
        title: "",
        publisher: "",
        content: "",
      },
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
          this.newData.createdate = getNewDate();
          // this.newData.createdate = new date.getDate();
          // console.log("newData", this.newData);

          addNews(this.newData).then((res) => {
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
            // 使用Object.keys获取对象的key值，通过filter遍历key值清空form表单数据
            this.newData = Object.keys(this.form).filter(
              (key) => (this.newData[key] = "")
            );
            this.$refs.ue.contents = "";
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.addNews {
  width: 100%;
  height: 100%;
  padding: 5% 0;
  .el-button {
    margin-top: 2%;
  }
}
</style>