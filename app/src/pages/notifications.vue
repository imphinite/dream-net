<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        Notifications
    </dn-page>
</template>

<script>
//-- Libraries

//-- Components
import DnPage from '@ct/page.vue'

//-- Composables

export default {
    name: 'dn-notifications',
    components: {
        DnPage,
    },
    setup() {
        return {}
    },
}
</script>
