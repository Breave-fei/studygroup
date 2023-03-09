<template>
  <div class="myUeditor">
    <vue-ueditor-wrap
      v-model="contents"
      :config="myConfig"
      style="width: 100%"
    ></vue-ueditor-wrap>
  </div>
</template>

<script>
export default {
  name: "MyUeditor",
  props: {
    content: "",
  },
  data() {
    return {
      contents: this.content,
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 200, // 初始容器高度
        initialFrameWidth: "100%", // 初始容器宽度
        initialContent: "请输入内容",
        UEDITOR_HOME_URL: "/static/ueditor/",
        // 上传文件接口（勿在生产环境使用！！！）
        // serverUrl: `http://localhost:3000/ueditor/Uploads`,
        serverUrl: `/ueditor/uploads`,
      },
    };
  },
};
</script>

<style scoped>
.myUeditor {
  max-height: 300px;
}
</style>

