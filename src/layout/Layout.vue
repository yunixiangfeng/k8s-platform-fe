<template>
  <div class="common-layout">
    <el-container>
      <el-side width="200">Aside</el-side>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
