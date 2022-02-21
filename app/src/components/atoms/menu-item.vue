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
    },
    setup(props) {
        const BASE_STYLES = ['flex w-full p-3', 'cursor-pointer', 'transition']

        const TEXT_STYLES = [
            'font-display text-white/90 text-center select-none',
            'active:text-white/50',
        ]

        const BG_STYLES = [
            'bg-transparent',
            'hover:bg-black/50',
            'active:bg-black/75',
        ]

        const computedStyles = computed(() => {
            return [BASE_STYLES, BG_STYLES, TEXT_STYLES]
        })

        return {
            computedStyles,
        }
    },
}
</script>
