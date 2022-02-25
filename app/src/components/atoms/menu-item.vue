<template>
    <div :class="computedStyles">
        <div class="w-1/6"><fa :icon="icon" /></div>
        <div>{{ label }}</div>
    </div>
</template>

<script>
import { toRef, computed } from 'vue'

export default {
    name: 'dn-menu-item',
    props: {
        preset: {
            type: String,
            default: 'primary',
            validator: (value) => {
                return ['primary', 'secondary'].indexOf(value) !== -1
            },
        },
        icon: {
            type: String,
            default: 'heart',
        },
        label: {
            type: String,
            default: 'label',
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const BASE_STYLES = [
            'flex w-full min-w-[144px] p-3',
            'cursor-pointer',
            'transition',
        ]

        const TEXT_STYLES = [
            'font-display text-center select-none',
            'text-white/90',
            'active:text-white/50',
        ]

        const active = toRef(props, 'active')
        const bgStyles = computed(() => {
            return [
                active.value ? 'bg-black/75' : 'bg-transparent',
                'hover:bg-black/50',
                'active:bg-black/75',
            ]
        })

        const computedStyles = computed(() => {
            return [BASE_STYLES, bgStyles.value, TEXT_STYLES]
        })

        return {
            computedStyles,
        }
    },
}
</script>
