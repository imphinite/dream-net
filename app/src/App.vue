<template>
    <div id="app">
        <navigation-drawer v-model="navDrawer" />
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationDrawer from '@co/navigation-drawer.vue'
import { ref } from 'vue'

export default {
    components: { NavigationDrawer },
    setup() {
        const navDrawer = ref(true)

        return {
            navDrawer,
        }
    },
}
</script>
