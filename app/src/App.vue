<template>
    <div id="app">
        <navigation-drawer
            v-model="navDrawer"
            v-model:active-item="activeItem"
            :menu-items="navigationMenuItems"
        />
        <loader v-model="loading" />
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationDrawer from '@co/navigation-drawer.vue'
import Loader from '@co/loader.vue'
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
