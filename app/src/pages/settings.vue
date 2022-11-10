<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        <dn-settings-form />
    </dn-page>
</template>

<script>
//-- Libraries
import { ref, watch } from 'vue'

//-- Components
import DnMenu from '@cm/menu.vue'
import DnPage from '@ct/page.vue'
import DnSettingsForm from '@co/settings-form.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useTheme from '@/composables/use-theme'

export default {
    name: 'dn-settings',
    components: {
        DnMenu,
        DnPage,
        DnSettingsForm,
    },
    setup() {
        const { themeOptions, setActiveTheme } = useTheme()

        const activeThemeMenuItem = ref()
        watch(activeThemeMenuItem, (newActiveItem) => {
            setActiveTheme(newActiveItem.key)
        })

        return {
            activeThemeMenuItem,
            themeOptions,
            ...useNavigationDrawer(),
        }
    },
}
</script>
