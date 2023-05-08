<template>
  <span>我是App.....</span>
  <!--  路由占位符-->
  <router-view></router-view>
</template>

<style>
  .html, body{
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
  #nprogress .bar {
    /* 自定义进度条 */
    background: #2186c0 !important;
  }
</style>