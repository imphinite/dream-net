<template>
    <footer :class="containerStyles">
        <div class="absolute right-4 bottom-16">
            <div class="flex h-full items-center">
                <dn-icon-button
                    icon="plus"
                    preset="secondary"
                    size="large"
                    class="drop-shadow-lg"
                    @click="$emit('plus-button-click', $event)"
                />
            </div>
        </div>

        <dn-icon-button
            icon="home"
            :preset="currentPage === 'Home' ? 'primary' : 'transparent'"
            @click="$emit('home-button-click', $event)"
        />
        <dn-icon-button
            icon="user"
            :preset="currentPage === 'My Dreams' ? 'primary' : 'transparent'"
            @click="$emit('user-button-click', $event)"
        />
        <dn-icon-button
            icon="comment"
            :preset="
                currentPage === 'Notifications' ? 'primary' : 'transparent'
            "
            @click="$emit('comment-button-click', $event)"
        />
        <dn-icon-button
            icon="gear"
            :preset="currentPage === 'Settings' ? 'primary' : 'transparent'"
            @click="$emit('settings-button-click', $event)"
        />
    </footer>
</template>

<script>
//-- External libraries
import { computed } from 'vue'

//-- Components
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
        currentPage: {
            type: String,
        },
    },
    setup() {
        const CONTAINER_STYLES = [
            'absolute',
            'flex w-full items-center justify-between px-5 py-2 z-10',
            'bg-purple-extra-dark/90',
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
