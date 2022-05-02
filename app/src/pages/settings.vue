<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        <div class="text-shadow text-white text-xl font-bold px-4 py-2">
            Theme
        </div>
        <dn-menu v-model="activeThemeMenuItem" :items="themeOptions" />
    </dn-page>
</template>

<script>
//-- Libraries
import _ from 'lodash'
import { ref, watch } from 'vue'

//-- Components
import DnPage from '@ct/page.vue'
import DnMenu from '@cm/menu.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useTheme from '@/composables/use-theme'

export default {
    name: 'dn-settings',
    components: { DnPage, DnMenu },
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
