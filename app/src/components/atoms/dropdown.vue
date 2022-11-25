<template>
    <div>
        <button :class="containerStyles" @click.prevent="toggleMenu">
            <input type="hidden" :id="id" :name="name" :value="dropdownValue" />
            <div :class="textStyles">
                {{ dropdownValue || placeholder }}
            </div>
            <div
                class="flex items-center justify-center h-6 w-6 text-xl shrink-0 text-black/70"
            >
                <fa :icon="menuActive ? 'angle-up' : 'angle-down'" />
            </div>
        </button>
        <slot :menu-active="menuActive">
            <dn-bottom-drawer
                class="text-sm"
                :menu-items="items"
                :model-value="menuActive"
                @update:model-value="menuActive = $event"
            />
        </slot>
    </div>
</template>

<script>
//-- Components
import DnBottomDrawer from '@co/bottom-drawer.vue'

//-- External libraries
import { computed, ref, watch } from 'vue'

export default {
    name: 'dn-dropdown',
    components: {
        DnBottomDrawer,
    },
    emits: ['update:modelValue', 'focus', 'blur'],
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },
        rounded: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        placeholder: {
            type: String,
            default: 'Select an item...',
        },
        items: {
            type: Array,
            default: () => {
                return [
                    {
                        name: 'Option 1',
                        value: 'option_1',
                    },
                    {
                        name: 'Option 2',
                        value: 'option_2',
                    },
                ]
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        //-- Styles
        const BASE_STYLES = [
            'flex items-center justify-between',
            'w-full px-4 py-2',
            'font-display select-none',
            'border-y border-black/20 rounded-md',
            'shadow-[inset_0_-1px_5px_rgba(0,0,0,0.2)]',
        ]

        const HOVER_STYLES = ['hover:bg-black/10', 'transition']

        const containerStyles = computed(() => {
            return [BASE_STYLES, props.disabled ? '' : HOVER_STYLES]
        })

        const menuActive = ref(false)

        //-- Data
        const dropdownValue = ref(props.modelValue)
        watch(dropdownValue, (newValue) => {
            emit('update:modelValue', newValue)
        })
        const toggleMenu = () => {
            console.log('toggle')
            if (props.disabled) return
            menuActive.value = !Boolean(menuActive.value)
        }

        const textStyles = computed(() => {
            return [
                'text-black/75 text-sm text-left',
                'line-clamp-1',
                (props.disabled || !dropdownValue.newValue) && 'text-gray-400',
            ]
        })

        return {
            containerStyles,
            textStyles,
            dropdownValue,
            menuActive,
            toggleMenu,
        }
    },
}
</script>
