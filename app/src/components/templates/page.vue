<template>
    <article :class="containerStyles">
        <dn-header
            @menu-button-click="showNavigationDrawer = !showNavigationDrawer"
        />

        <section class="scrollbar-hidden" :class="bodySectionStyles">
            <slot>
                <dn-card
                    v-for="(item, index) in 20"
                    :key="index"
                    class="snap-start mt-2"
                />
            </slot>
        </section>

        <dn-navigation-drawer v-model="showNavigationDrawer" />
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

export default {
    name: 'dn-page',
    components: { DnHeader, DnNavigationDrawer, DnCard },
    props: {},
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
            'bg-black/50',
        ]

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES]
        })

        const BODY_SECTION_STYLES = [
            'absolute',
            'w-full h-screen pt-12',
            'snap-y overflow-y-scroll scroll-smooth box-content scroll-py-14',
        ]

        const bodySectionStyles = computed(() => {
            return [BODY_SECTION_STYLES]
        })

        return {
            containerStyles,
            bodySectionStyles,
        }
    },
    methods: {},
}
</script>
