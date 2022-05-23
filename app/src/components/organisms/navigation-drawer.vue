<template>
    <div ref="navbar" class="navbar" :class="containerStyles">
        <div
            class="navbar-header w-full h-1/8 flex items-center justify-between p-2"
        >
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
            <dn-menu
                v-model="activeMenuItem"
                :items="menuItems"
                @select="onMenuItemSelected"
            />
        </div>
        <div
            class="navbar-footer w-full p-2 text-right font-normal text-sm text-gray-400"
        >
            @dreamnet
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
            'flex flex-col justify-between items-center divide-y divide-slate-500/50',
            'absolute top-0 left-0 h-screen z-50',
            'border-r border-slate-700 border-left-none rounded-r-lg overflow-hidden',
            'text-white font-bold select-none',
            'transition-all ease-in-out duration-500',
        ]

        const BG_STYLES = ['backdrop-blur-md', 'shadow-lg']

        const active = toRef(props, 'modelValue')
        const transitionStyles = computed(() => {
            return active.value
                ? [
                      'w-11/12',
                      'bg-gradient-to-tr from-gray-900/25 via-gray-800/25 to-gray-500/50',
                  ]
                : ['w-0 border-none', 'bg-black/50']
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
                collapse()
            }
        }

        return {
            navbar,
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
