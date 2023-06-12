<template>
    <footer :class="containerStyles">
        <div class="absolute right-4 bottom-16">
            <div class="flex h-full items-center">
                <dn-icon-button
                    icon="plus"
                    preset="secondary"
                    size="large"
                    class="shadow-md"
                    @click="$emit('plus-button-click', $event)"
                />
            </div>
        </div>

        <div :class="innerContainerStyles">
            <dn-icon-button
                icon="home"
                :preset="currentPage === 'Home' ? 'primary' : 'transparent'"
                @click="$emit('home-button-click', $event)"
            />
            <dn-icon-button
                icon="user"
                :preset="
                    currentPage === 'My Dreams' ? 'primary' : 'transparent'
                "
                @click="$emit('user-button-click', $event)"
            />
            <dn-icon-button
                icon="comments"
                :preset="
                    currentPage === 'Notifications' ? 'primary' : 'transparent'
                "
                @click="$emit('comments-button-click', $event)"
            />
            <dn-icon-button
                icon="gear"
                :preset="currentPage === 'Settings' ? 'primary' : 'transparent'"
                @click="$emit('settings-button-click', $event)"
            />
        </div>
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
        'plus-button-click',
        'home-button-click',
        'user-button-click',
        'comments-button-click',
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
            'w-full px-5 py-2 z-10',
            'bg-purple-extra-dark/90',
            'bottom-0',
        ]

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES]
        })

        const innerContainerStyles = computed(() => {
            return ['flex items-center justify-between', 'm-auto', 'max-w-md']
        })

        return {
            containerStyles,
            innerContainerStyles,
        }
    },
    methods: {},
}
</script>
