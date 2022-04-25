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
        >
            <h1 class="text-white text-xl ml-2 font-bold">Dreamnet</h1>
        </div>

        <div class="flex h-full items-center">
            <dn-icon-button
                v-if="interactions.plus"
                icon="plus"
                preset="transparent"
                @click="$emit('plus-button-click', $event)"
            />
        </div>
    </header>
</template>

<script>
import { computed } from 'vue'
import DnButton from '@ca/button.vue'
import DnIconButton from '@ca/icon-button.vue'

export default {
    name: 'dn-header',
    components: { DnButton, DnIconButton },
    emits: ['back-button-click', 'menu-button-click', 'plus-button-click'],
    props: {
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
            'backdrop-blur-md bg-gradient-to-b from-black/50 to-transparent',
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
