<template>
    <header :class="containerStyles">
        <div class="flex h-full items-center">
            <dn-icon-button
                v-if="interactions.menu"
                icon="bars"
                preset="transparent"
                @click="$emit('menu-button-click', $event)"
            />
            <dn-icon-button
                v-if="interactions.back"
                icon="arrow-left"
                preset="transparent"
                @click="$emit('back-button-click', $event)"
            />
        </div>
        <div
            class="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
            @click="$emit('title-click')"
        >
            <h1 class="header-title text-white text-xl ml-2 font-bold">
                {{ title }}
            </h1>
        </div>

        <div class="flex h-full items-center"></div>
    </header>
</template>

<style scoped>
.header-title {
    text-shadow: 0 0 4px rgb(73, 0, 0);
}
</style>

<script>
import { computed } from 'vue'
import DnIconButton from '@ca/icon-button.vue'

export default {
    name: 'dn-header',
    components: { DnIconButton },
    emits: [
        'back-button-click',
        'menu-button-click',
        'plus-button-click',
        'title-click',
    ],
    props: {
        title: {
            type: String,
            default: 'DreamNet',
        },
        user: {
            type: Object,
        },
        interactions: {
            type: Object,
            default: () => ({
                back: true,
                menu: true,
                plus: true,
            }),
        },
    },
    setup() {
        const CONTAINER_STYLES = [
            'relative',
            'flex w-full items-center justify-between p-2 z-10',
            'backdrop-blur-md bg-gradient-to-b from-purple-default/50 to-purple-default/25',
        ]

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES]
        })

        return {
            containerStyles,
        }
    },
    methods: {},
}
</script>
