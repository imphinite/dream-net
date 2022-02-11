import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import About from '@/pages/about.vue'
import Tailwind from '@/pages/tailwind.vue'
import Arena from '@/pages/arena.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/tailwind',
        name: 'Tailwind',
        component: Tailwind,
    },
    {
        path: '/arena',
        name: 'Arena',
        component: Arena,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
