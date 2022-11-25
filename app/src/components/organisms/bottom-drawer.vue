<template>
    <div ref="drawer" class="drawer" :class="containerStyles">
        <div
            class="drawer-header w-full h-1/8 flex flex-col items-center justify-center pt-1 px-2"
            @click="collapse"
        >
            <div class="border-b mx-2 border-black/40 w-1/4"></div>
            <div class="border-b mx-2 border-black/40 w-1/4 mt-[1px]"></div>
        </div>

        <div class="drawer-body h-full w-full flex flex-col grow py-2">
            <dn-menu
                v-model="activeMenuItem"
                :items="menuItems"
                @select="onMenuItemSelected"
            />
        </div>
    </div>
</template>

<script>
//-- Libraries
import { ref, toRef, computed, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

//-- Components
import DnIconButton from '@ca/icon-button.vue'
import DnMenu from '@cm/menu.vue'

export default {
    name: 'dn-bottom-drawer',
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
        menuItems: {
            type: Array,
            default: () => [
                {
                    icon: 'home',
                    label: 'Home',
                },
            ],
        },
        activeItem: {
            type: Object,
        },
    },
    emits: ['update:modelValue', 'update:active-item'],
    setup(props, { emit }) {
        const BASE_STYLES = [
            'flex flex-col justify-between items-center',
            'absolute bottom-0 left-0 w-screen z-50',
            'border-t border-black/25 border-bottom-none rounded-t-lg overflow-hidden',
            'select-none',
            'transition-all ease-in-out duration-500',
        ]

        const BG_STYLES = ['backdrop-blur-md', 'bg-white/90']

        const active = toRef(props, 'modelValue')
        const transitionStyles = computed(() => {
            return active.value ? ['h-1/4'] : ['h-0']
        })

        const containerStyles = computed(() => {
            return [BASE_STYLES, BG_STYLES, transitionStyles.value]
        })

        const collapse = () => {
            emit('update:modelValue', false)
        }

        const drawer = ref()
        onClickOutside(drawer, () => {
            if (!active.value) return
            collapse()
        })

        const activeMenuItem = ref(props.activeItem)

        const router = useRouter()
        watch(activeMenuItem, (newActiveMenuItem) => {
            emit('update:active-item', newActiveMenuItem)

            if (router) {
                router.push({ name: newActiveMenuItem.label })
                collapse()
            }
        })

        const onMenuItemSelected = (menuItem) => {
            if (router) {
                router.push({ name: menuItem.label })
            }
            collapse()
        }

        return {
            drawer,
            containerStyles,
            active,
            collapse,
            onMenuItemSelected,
            activeMenuItem,
        }
    },
    methods: {},
}
</script>
