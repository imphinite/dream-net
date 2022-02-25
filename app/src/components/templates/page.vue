<template>
    <article :class="containerStyles">
        <dn-header
            @menu-button-click="showNavigationDrawer = !showNavigationDrawer"
        />

        <section :class="bodySectionStyles">
            <dn-card
                v-for="(item, index) in 20"
                :key="index"
                class="snap-start mt-2"
            />
        </section>

        <dn-navigation-drawer v-model="showNavigationDrawer" />
    </article>
</template>

<script>
import { computed } from 'vue'
import DnHeader from '@cm/header.vue'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import DnCard from '@cm/card.vue'

export default {
    name: 'dn-page',
    components: { DnHeader, DnNavigationDrawer, DnCard },
    props: {
        user: {
            type: Object,
        },
    },
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

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES]
        })

        const BODY_SECTION_STYLES = [
            'absolute',
            'w-full h-screen px-2 pt-12',
            'snap-y overflow-y-scroll scroll-smooth box-content scroll-py-14 pr-[17px]',
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
