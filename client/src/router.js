import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode:"history",
    routes: [
        {
            path:"/",
            alias:"home",
            name:"home",
            component: () => import("./components/HomeComponent")
        },
        {
            path:"/login",
            alias:"login",
            name:"login",
            component: () => import("./components/LoginComponent")
        },
        {
            path:"/admin",
            alias:"admin",
            name:"admin",
            component: () => import("./components/AdminComponent")
        }
    ]
})