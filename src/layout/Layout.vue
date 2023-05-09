
<template>
  <div class="common-layout">
    <el-container style="height:100vh">
      <el-aside class="aside" :width="asideWidth">
        <!-- 固钉，将平台logo和名字固钉在侧边栏最上方 -->
        <!-- z-index是显示优先级,为了让固钉保持显示 -->
        <el-affix class="aside-affix" :z-index="1200">
          <div class="aside-logo">
            <!-- logo图片 -->
            <el-image class="logo-image" :src="logo" />
            <!-- 平台名，折叠后不显示 -->
            <span :class="[isCollapse ? 'is-collapse' : '']">
              <span class="logo-name">Kubernetes</span>
            </span>
          </div>
        </el-affix>
        <!-- 菜单导航栏 -->
        <!-- router 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <!-- default-active 当前激活菜单的index,将菜单栏与路径做了对应关系 -->
        <!-- collapse 是否折叠 -->
        <el-menu class="aside-menu"
                 router
                 :default-active="$route.path"
                 :collapse="isCollapse"
                 background-color="#131b27"
                 text-color="#bfcbd9"
                 active-text-color="#20a0ff">
          <!-- for循环路由规则 -->
          <div v-for="menu in routers" :key="menu">
            <!-- 处理子路由只有1个的情况，如概要、工作流 -->
            <el-menu-item class="aside-menu-item" v-if="menu.children && menu.children.length == 1" :index="menu.children[0].path">
              <!-- 引入图标的方式 -->
              <el-icon><component :is="menu.children[0].icon" /></el-icon>
              <template #title>
                {{menu.children[0].name}}
              </template>
            </el-menu-item>
            <!-- 处理有多个子路由的情况，如集群、工作负载、负载均衡等 -->
            <!-- 父菜单 -->
            <!-- 注意el-menu-item在折叠后，title的部分会自动消失，但el-sub-menu不会，需要自己控制 -->
            <el-sub-menu class="aside-submenu" v-else-if="menu.children && menu.children.length > 1" :index="menu.path">
              <template #title>
                <el-icon><component :is="menu.icon" /></el-icon>
                <span :class="[isCollapse ? 'is-collapse' : '']">{{menu.name}}</span>
              </template>
              <!-- 子菜单 -->
              <el-menu-item class="aside-menu-childitem" v-for="child in menu.children" :key="child" :index="child.path">
                <template #title>
                  {{child.name}}
                </template>
              </el-menu-item>
            </el-sub-menu>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header -->
        <el-header class="header">
          <el-row :gutter="20">
            <el-col :span="1">
              <!-- 折叠按钮 -->
              <div class="header-collapse" @click="onCollapse">
                <el-icon><component :is="isCollapse ? 'expand':'fold'" /></el-icon>
              </div>
            </el-col>
            <el-col :span="10">
              <!-- 面包屑 -->
              <div class="header-breadcrumb">
                <!-- separator 分隔符 -->
                <el-breadcrumb separator="/">
                  <!-- :to="{ path: '/' }"表示跳转到/路径 -->
                  <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item>
                  <!-- this.$route.matched 可以拿到当前页面的路由信息 -->
                  <template v-for="(matched,m) in this.$route.matched" :key="m">
                    <el-breadcrumb-item v-if="matched.name != undefined">
                      {{ matched.name }}
                    </el-breadcrumb-item>
                  </template>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col class="header-menu" :span="13">
              <!-- 用户信息 -->
              <el-dropdown>
                <!-- 头像及用户名 -->
                <div class="header-dropdown">
                  <el-image class="avator-image" :src="avator" />
                  <span>{{ username }}</span>
                </div>
                <!-- 下拉框内容 -->
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="logout()">退出</el-dropdown-item>
                    <el-dropdown-item >修改密码</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-header>
        <el-main class="main">
          <!-- 路由占位符，展示匹配到的路由的视图组件 -->
          <router-view></router-view>
        </el-main>
        <!-- footer -->
        <el-footer class="footer">
          <el-icon style="width:2em;top:3px;font-size:18px"><place/></el-icon>
          <a class="footer el-icon-place">Kubernetes 管理系统</a>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>


<script>
import {useRouter} from 'vue-router'
export default {
  data() {
    return {
      //导入头像图片
      avator: require('@/assets/img/avator.png'),
      //导入logo图片
      logo: require('@/assets/img/k8s-metrics.png'),
      //控制导航栏折叠
      isCollapse: false,
      //导航栏宽度
      asideWidth: '220px',
      //路由规则
      routers: [],
    }
  },
  computed: {
    //获取用户名
    username() {
      let username = localStorage.getItem('username');
      //三元运算
      return username ? username : '未知';
    },
  },
  methods: {
    //控制折叠
    onCollapse() {
      if (this.isCollapse) {
        this.isCollapse = false
        this.asideWidth = '220px'
      } else {
        this.isCollapse = true
        this.asideWidth = '64px'
      }
    },
    //登出
    logout() {
      //移除用户名
      localStorage.removeItem('username');
      //移除token
      localStorage.removeItem('token');
      //跳转至/login页面
      this.$router.push('/login');
    }
  },
  beforeMount() {
    //使用useRouter().options.routes方法获取路由规则
    this.routers = useRouter().options.routes
  }
}
</script>


<style scoped>
/* 侧边栏折叠速度，背景色 */
.aside{
  transition: all .5s;
  background-color: #131b27;
}
/* 固钉，以及logo图片和平台名的属性 */
.aside-logo{
  background-color: #131b27;
  height: 60px;
  color: white;
}
.logo-image {
  width: 40px;
  height: 40px;
  top: 12px;
  padding-left: 12px;
}
.logo-name{
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
}
/* 滚动条不展示 */
.aside::-webkit-scrollbar {
  display: none;
}
/* 修整边框，让边框不要有溢出 */
.aside-affix {
  border-bottom-width: 0;
}
.aside-menu {
  border-right-width: 0;
}
/* 菜单栏的位置以及颜色 */
.aside-menu-item.is-active {
  background-color: #1f2a3a ;
}
.aside-menu-item {
  padding-left: 20px !important;
}
.aside-menu-item:hover {
  background-color: #142c4e ;
}
.aside-menu-childitem {
  padding-left: 40px !important;
}
.aside-menu-childitem.is-active {
  background-color: #1f2a3a ;
}
.aside-menu-childitem:hover {
  background-color: #142c4e ;
}
/* header的属性 */
.header{
  z-index: 1200;
  line-height: 60px;
  font-size: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
/* 折叠按钮 */
.header-collapse{
  cursor: pointer;
}
/* 面包屑 */
.header-breadcrumb{
  padding-top: 0.9em;
}
/* 用户信息靠右 */
.header-menu{
  text-align: right;
}
/* 折叠属性 */
.is-collapse {
  display: none;
}
/* 用户信息下拉框 */
.header-dropdown {
  line-height: 60px;
  cursor: pointer;
}
/* 头像 */
.avator-image {
  top: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
}
.main {
  padding: 10px;
}
.footer {
  z-index: 1200;
  color: rgb(187, 184, 184);
  font-size: 14px;
  text-align: center;
  line-height: 60px;
}
</style>
