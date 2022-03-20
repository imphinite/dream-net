<template>
    <div id="app">
        <navigation-drawer
            v-model="navDrawer"
            v-model:active-item="activeItem"
            :menu-items="navigationMenuItems"
        />
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationDrawer from '@co/navigation-drawer.vue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
    components: { NavigationDrawer },
    setup() {
        const navDrawer = ref(false)

        // Generate navigation menu items from router config
        const router = useRouter()
        const ROUTE_ICON_MAPPING = {
            Home: 'home',
            Favorites: 'star',
            History: 'book',
            Settings: 'gear',
            Logout: 'user',
        }
        const navigationMenuItems = ref()
        navigationMenuItems.value = router.options.routes
            .filter((route) => route.name !== 'Auth')
            .map((route) => {
                return {
                    label: route.name,
                    icon: ROUTE_ICON_MAPPING[route.name],
                }
            })

        // Initialize active menu item
        const activeItem = ref()
        watch(activeItem, (newActiveItem) => {
            router.push({ name: newActiveItem.label })
        })

        return {
            navDrawer,
            activeItem,
            navigationMenuItems,
        }
    },
}
</script>
