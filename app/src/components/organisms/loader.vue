<template>
    <div v-if="active" :class="computedStyles">
        <slot>
            <div>
                <fa class="fa-spin text-4xl" icon="spinner" />
            </div>
        </slot>
    </div>
</template>

<script>
import { toRef, computed, watch } from 'vue'

export default {
    name: 'dn-loader',
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const BASE_STYLES = [
            'flex flex-col justify-center items-center',
            'absolute top-0 left-0 w-screen h-screen overflow-hidden',
            'font-bold text-white',
            'pointer-events-none',
            'z-100',
        ]

        const BG_STYLES = [
            'bg-gradient-to-tr from-gray-900/25 via-gray-800/25 to-gray-500/50',
            'backdrop-blur-md',
            'shadow-lg',
        ]

        //-- refs
        const active = toRef(props, 'modelValue')
        watch(active, (newActive) => {
            emit('update:modelValue watcher', newActive)
        })

        //-- computed
        const computedStyles = computed(() => {
            return [BASE_STYLES, BG_STYLES]
        })

        return {
            computedStyles,
            active,
        }
    },
}
</script>
