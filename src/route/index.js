import { createRouter , createWebHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import ("@/views/auth/LoginView.vue")
    },
    {
        path: "/register",
        name: "register",
        component: () => import ("@/views/auth/RegisterView.vue")
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () => import ("@/views/dashboard/DashboardView.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;