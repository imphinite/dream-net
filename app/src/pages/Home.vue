<template>
    <article :class="containerStyles">
        <dn-header @menu-button-click="navDrawer = !navDrawer" />

        <section class="scrollbar-hidden" :class="bodySectionStyles">
            <slot>
                <dn-card
                    v-for="(item, index) in 20"
                    :key="index"
                    class="snap-start mt-2"
                />
            </slot>
        </section>
    </article>
</template>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
    width: 0 !important;
}
.scrollbar-hidden {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
</style>

<script>
import { computed } from 'vue'
import DnHeader from '@cm/header.vue'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import DnCard from '@cm/card.vue'
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useGradients from '@/composables/use-gradients'

export default {
    name: 'dn-home',
    components: { DnHeader, DnNavigationDrawer, DnCard },
    data() {
        return {
            showNavigationDrawer: false,
        }
    },
    setup() {
        const CONTAINER_STYLES = [
            'relative',
            'flex flex-col',
            'w-screen h-screen overflow-hidden',
        ]

        const { GRADIENTS } = useGradients({ hover: false })
        const BG_STYLES = ['bg-gradient-to-tr', GRADIENTS.ROYAL]

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES, BG_STYLES]
        })

        const BODY_SECTION_STYLES = [
            'absolute',
            'w-full h-screen pt-12',
            'snap-y overflow-y-scroll scroll-smooth box-content scroll-py-14',
        ]

        const bodySectionStyles = computed(() => {
            return [BODY_SECTION_STYLES]
        })

        const { navDrawer } = useNavigationDrawer()

        return {
            navDrawer,
            containerStyles,
            bodySectionStyles,
        }
    },
    methods: {},
}
</script>
