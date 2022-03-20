import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/pages/auth.vue'
import Home from '@/pages/home.vue'
import About from '@/pages/about.vue'
import Tailwind from '@/pages/tailwind.vue'
import Arena from '@/pages/arena.vue'
import useAuthentication from '@/composables/use-authentication'

const routes = [
    {
        path: '/sign-up',
        name: 'Auth',
        component: Auth,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: About,
    },
    {
        path: '/history',
        name: 'History',
        component: Tailwind,
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Arena,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Auth,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Redirect to auth page if not authenticated
router.beforeEach((to, from) => {
    const { isAuthenticated } = useAuthentication()
    if (!isAuthenticated.value && to.name != 'Auth') {
        return { name: 'Auth' }
    }
})

export default router
