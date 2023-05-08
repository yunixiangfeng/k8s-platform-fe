import {createRouter, createWebHistory} from 'vue-router'
// 导入进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//定义路由规则
const routes = [
    {
        path: '/home', //视图
        component: () => import('@/layout/Layout.vue'),
        icon: "odometer", //图标
        meta: {title:"Layout", requireAuth: false}, //定义meta元数据, title:"概要"
        children: [
            {
                path: '/home', //视图
                component: () => import('@/views/home/Home.vue'),
                icon: "odometer", //图标
                meta: {title:"概要", requireAuth: false}, //定义meta元数据               
            }
        ]
    },
    // {
    //     path: '/layout', 
    //     component: () => import('@/layout/Layout.vue'),
    //     icon: "odometer", //图标
    //     meta: {title:"Layout", requireAuth: false}, //定义meta元数据
    // },
    // {
    //     path: '/workload',
    //     component: Layout,
    //     icon: "menu", //图标
    //     meta: {title:"工作负载", requireAuth: false},
    //     children: [
    //         {
    //             path: '/workload/deployment',
    //             name: 'Deployment',
    //             icon: "el-icons-s-data", //图标
    //             meta: {title:"Deployment", requireAuth: true}, //定义meta元数据
    //             component: () => import('@/views/workload/Deployment.vue')
    //         },
    //         {
    //             path: '/workload/pod',
    //             name: 'Pod',
    //             icon: "el-icons-document-add", //图标
    //             meta: {title:"Pod", requireAuth: true}, //定义meta元数据
    //             component: () => import('@/views/workload/Pod.vue')
    //         },
    //     ]
    // },
    {
        path: '/404',
        component: () => import('@/views/common/404.vue'),
        meta: {title:"404",requiredAuth:true},
    },
    {
        path: '/403',
        component: () => import('@/views/common/403.vue'),
        meta: {title:"403",requiredAuth:true},
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    } 

]

//创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

//进度条配置
NProgress.inc(0.2) //设置进度条递增
NProgress.configure({easing: 'ease', speed: 600, showSpinner: false})//动画效果、动画速度、进度环是否显示

//路由守卫，路由拦截
router.beforeEach((to, from, next) => {
    //启动进度条
    NProgress.start()
    //设置头部
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = "Kubernetes"
    }
    // 放行
    next()
})

//关闭进度条
router.afterEach(() => {
    NProgress.done()
})

export default router




