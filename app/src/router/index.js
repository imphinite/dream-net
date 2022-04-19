import { createRouter, createWebHistory } from 'vue-router'
import Auth from '@/pages/auth.vue'
import Home from '@/pages/home.vue'
import About from '@/pages/about.vue'
import Tailwind from '@/pages/tailwind.vue'
import Arena from '@/pages/arena.vue'
import useAuthentication from '@/composables/use-authentication'
import useStore from '@/store/use-store'

const clearAuthBeforeEnterAuthRoutes = () => {
    const { auth: authModule } = useStore()
    const { clearAuth } = authModule
    clearAuth()
}

const routes = [
    {
        path: '/sign-up',
        name: 'Signup',
        component: Auth,
        beforeEnter: [clearAuthBeforeEnterAuthRoutes],
    },
    {
        path: '/login',
        name: 'Login',
        component: Auth,
        beforeEnter: [clearAuthBeforeEnterAuthRoutes],
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
        redirect: () => {
            return '/login'
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Redirect to auth page if not authenticated
router.beforeEach((to) => {
    const { isAuthenticated } = useAuthentication()
    const isAuthRoute = to.name === 'Signup' || to.name === 'Login'

    if (!isAuthenticated.value && !isAuthRoute) {
        return { name: 'Login' }
    }
})

export default router
