<template>
    <footer :class="containerStyles">
        <dn-icon-button
            icon="user"
            preset="transparent"
            @click="$emit('user-button-click', $event)"
        />
        <dn-icon-button
            icon="comment-dots"
            preset="transparent"
            @click="$emit('chat-button-click', $event)"
        />
        <dn-icon-button
            icon="star"
            preset="transparent"
            @click="$emit('favorites-button-click', $event)"
        />
        <dn-icon-button
            icon="gear"
            preset="transparent"
            @click="$emit('settings-button-click', $event)"
        />
    </footer>
</template>

<script>
import { computed } from 'vue'
import DnIconButton from '@ca/icon-button.vue'

export default {
    name: 'dn-footer',
    components: { DnIconButton },
    emits: [
        'user-button-click',
        'chat-button-click',
        'favorites-button-click',
        'settings-button-click',
    ],
    props: {
        user: {
            type: Object,
        },
    },
    setup() {
        const CONTAINER_STYLES = [
            'absolute',
            'flex w-full items-center justify-between px-5 py-2 z-10',
            'bg-black/90',
            // 'backdrop-blur-md bg-gradient-to-b from-black/50 to-transparent',
            'bottom-0',
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
