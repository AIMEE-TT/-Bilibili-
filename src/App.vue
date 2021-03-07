<template>
  <div id="app">
    <!-- 路由占位符 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepalive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepalive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f4f4f4;
}
p {
  margin: 0;
  padding: 0;
}
</style>
