<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        <div class="text-white text-4xl font-bold text-center">History</div>
    </dn-page>
</template>

<script>
//-- Components
import DnPage from '@ct/page.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'

export default {
    name: 'dn-history',
    components: { DnPage },
    setup() {
        return {
            ...useNavigationDrawer(),
        }
    },
}
</script>
