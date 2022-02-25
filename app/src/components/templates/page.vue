<template>
    <article class="relative w-screen h-screen overflow-hidden flex flex-col">
        <dn-header
            class=""
            @menu-button-click="showNavigationDrawer = !showNavigationDrawer"
        />

        <dn-navigation-drawer v-model="showNavigationDrawer" />

        <section
            class="absolute w-full h-screen px-2 snap-y overflow-y-scroll scroll-smooth box-content pr-[17px] pt-12 scroll-py-14"
        >
            <dn-card
                v-for="(item, index) in 20"
                :key="index"
                class="snap-start mt-2"
            />
        </section>
    </article>
</template>

<script>
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
    methods: {},
}
</script>
