<template>
    <div ref="navbar" class="navbar" :class="containerStyles">
        <div
            class="navbar-header w-full h-1/8 flex items-center justify-between p-2"
        >
            <!-- <img class="object-contain h-full" :src="favicon" alt="favicon" /> -->
            <div class="navbar-header-left px-2">
                <span class="title text-xl min-w-max">{{ title }}</span>
            </div>

            <dn-icon-button
                preset="transparent"
                icon="arrow-left"
                @click="collapse"
            ></dn-icon-button>
        </div>

        <div class="navbar-body w-full flex flex-col grow py-2">
            <dn-menu :items="menuItems" @select="" />
        </div>
        <div
            class="navbar-footer w-full p-2 text-right font-normal text-sm text-gray-400"
        >
            @dreamnet
        </div>
    </div>
</template>

<script>
import favicon from '@/assets/favicon.png'
import { ref, toRef, computed, watch } from 'vue'
import DnIconButton from '@ca/icon-button.vue'
import DnMenu from '@cm/menu.vue'
import { onClickOutside } from '@vueuse/core'

export default {
    name: 'dn-navigation-drawer',
    components: {
        DnIconButton,
        DnMenu,
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            favicon: favicon,
            links: [
                {
                    name: 'home',
                    to: '/',
                },
                {
                    name: 'about',
                    to: '/about',
                },
            ],
            menuItems: [
                {
                    icon: 'home',
                    label: 'Home',
                },
                {
                    icon: 'star',
                    label: 'Favorites',
                },
                {
                    icon: 'book',
                    label: 'History',
                },
                {
                    icon: 'gear',
                    label: 'Settings',
                },
            ],
        }
    },
    setup(props, { emit }) {
        const BASE_STYLES = [
            'flex flex-col justify-between items-center divide-y divide-white/25',
            'h-screen',
            'border-r border-slate-700 border-left-none rounded-r-lg overflow-hidden',
            'text-white font-bold select-none',
            'transition-[width] ease-in-out duration-500',
        ]

        const BG_STYLES = [
            'bg-gradient-to-tr from-gray-900/25 via-gray-800/25 to-gray-500/50',
            'backdrop-blur-md',
            'shadow-lg',
        ]

        const active = toRef(props, 'modelValue')
        const transitionStyles = computed(() => {
            return active.value ? ['w-11/12'] : ['w-0 border-none']
        })

        const containerStyles = computed(() => {
            return [BASE_STYLES, BG_STYLES, transitionStyles.value]
        })

        const collapse = () => {
            emit('update:modelValue', false)
        }

        const navbar = ref()
        onClickOutside(navbar, () => {
            if (!active.value) return
            collapse()
        })

        return {
            navbar,
            containerStyles,
            active,
            collapse,
        }
    },
    methods: {},
}
</script>
