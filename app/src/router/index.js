//-- Libraries
import { createRouter, createWebHashHistory } from 'vue-router'

//-- Composables
import useStore from '@/store/use-store'
import useAuthentication from '@/composables/use-authentication'

//-- Pages
import Auth from '@/pages/auth.vue'
import Home from '@/pages/home.vue'
import Feed from '@/pages/feed.vue'
import Favorites from '@/pages/favorites.vue'
import MyDreams from '@/pages/my-dreams.vue'
import Notifications from '@/pages/notifications.vue'
import Settings from '@/pages/settings.vue'
import Post from '@/pages/post.vue'
import Compose from '@/pages/compose.vue'

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
        meta: {
            navigatable: true,
        },
    },
    {
        path: '/feed',
        name: 'Feed',
        component: Feed,
        meta: {
            navigatable: true,
        },
    },
    {
        path: '/posts/:id',
        name: 'Post',
        component: Post,
    },
    {
        path: '/compose',
        name: 'Compose',
        component: Compose,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: Favorites,
        meta: {
            navigatable: true,
        },
    },
    {
        path: '/my-dreams',
        name: 'My Dreams',
        component: MyDreams,
        meta: {
            navigatable: true,
        },
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: Notifications,
        meta: {
            navigatable: true,
        },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            navigatable: true,
        },
    },
    {
        path: '/logout',
        name: 'Logout',
        redirect: () => {
            return '/login'
        },
        meta: {
            navigatable: true,
        },
    },
]

const router = createRouter({
    history: createWebHashHistory(),
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
