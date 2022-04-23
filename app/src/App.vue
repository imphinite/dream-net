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
//-- Components
import NavigationDrawer from '@co/navigation-drawer.vue'
import Loader from '@co/loader.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useLoading from '@/composables/use-loading'

export default {
    components: { NavigationDrawer, Loader },
    setup() {
        const { navDrawer, activeItem, navigationMenuItems } =
            useNavigationDrawer()

        const { loading } = useLoading()

        return {
            navDrawer,
            activeItem,
            navigationMenuItems,
            loading,
        }
    },
}
</script>
