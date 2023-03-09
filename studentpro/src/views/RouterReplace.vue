<template>
  <div class="routerreplace">空白跳转路由</div>
</template>
<script>
export default {
  name: "RouterReplace",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$router.push(from.fullPath);
    });
  },
};
</script>

<style lang="scss">
</style>