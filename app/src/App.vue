<template>
    <div id="app">
        <navigation-drawer
            v-model="navDrawer"
            v-model:active-item="activeItem"
            :menu-items="navigationMenuItems"
        />
        <router-view></router-view>
        <loader v-model="loading" />
    </div>
</template>

<script>
//-- Libraries
import _ from 'lodash'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

//-- Components
import NavigationDrawer from '@co/navigation-drawer.vue'
import Loader from '@co/loader.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useLoading from '@/composables/use-loading'

export default {
    components: { NavigationDrawer, Loader },
    setup() {
        const { loading } = useLoading()

        const { navDrawer, activeItem } = useNavigationDrawer()

        // Generate navigation menu items from router config
        const router = useRouter()
        const ROUTE_ICON_MAPPING = {
            Home: 'home',
            Favorites: 'star',
            'My Dreams': 'book',
            Settings: 'gear',
            Logout: 'user',
        }
        const navigationMenuItems = ref()
        navigationMenuItems.value = router.options.routes
            .filter((route) => route?.meta?.navigatable)
            .map((route) => {
                return {
                    label: route.name,
                    icon: ROUTE_ICON_MAPPING[route.name],
                    meta: route.meta,
                }
            })

        return {
            navDrawer,
            activeItem,
            navigationMenuItems,
            loading,
        }
    },
}
</script>
