<template>
    <button type="button" :class="computedStyles">
        <slot>
            <fa :icon="icon" />
        </slot>
    </button>
</template>

<script>
import { toRef, computed } from 'vue'

export default {
    name: 'dn-icon-button',

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
        size: {
            type: String,
            default: 'medium',
            validator: function (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1
            },
        },
    },

    setup(props) {
        const BASE_STYLES =
            'flex items-center justify-center font-display border-2 rounded-full transition'

        //-- refs
        const preset = toRef(props, 'preset')
        const size = toRef(props, 'size')

        //-- computed
        const computedPresetStyles = computed(() => {
            const presetStyleMapping = {
                primary: [
                    'bg-white text-purple-dark border-purple-dark',
                    'hover:bg-purple-dark hover:text-white hover:purple-dark',
                    'active:bg-purple-extra-dark active:text-white',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
                secondary: [
                    'bg-purple-dark text-white border-purple-dark',
                    'hover:bg-white hover:text-purple-dark hover:border-gray-300',
                    'active:bg-gray-300 active:text-purple-dark',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
            }
            return presetStyleMapping[preset.value] || ''
        })
        const computedSizeStyles = computed(() => {
            const sizeStyleMapping = {
                large: ['font-bold text-lg w-11 h-11'],
                medium: ['font-semibold text-base w-9 h-9'],
                small: ['font-semibold text-sm w-7 h-7'],
            }
            return sizeStyleMapping[size.value] || ''
        })
        const computedStyles = computed(() => {
            return [
                BASE_STYLES,
                computedPresetStyles.value,
                computedSizeStyles.value,
            ]
        })

        return {
            computedStyles,
        }
    },
}
</script>
