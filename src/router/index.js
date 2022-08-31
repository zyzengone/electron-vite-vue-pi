import {createRouter, createWebHashHistory} from 'vue-router';
// 1. 定义路由组件， 注意，这里一定要使用 文件的全名（包含文件后缀名）
import welcome from "../components/HelloWorld.vue";
import page2 from "../components/Page2.vue";
import page3 from "../components/Page3.vue";
import home from "../components/Home.vue";
import transitionExtend from "./transitionExtends";
const routes = [
    { path: "/", redirect: '/home' },
    { path: "/page2", component: page2 },
    { path: "/home", component: home },
    { path: "/page3", component: page3 }
]

// Vue-router新版本中，需要使用createRouter来创建路由
export default  createRouter({
// 指定路由的模式,此处使用的是hash模式
    history: createWebHashHistory(),
    routes // short for `routes: routes`
})
