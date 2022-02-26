<template>
    <button type="button" :class="computedStyles">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script>
import { toRef, computed } from 'vue'

export default {
    name: 'dn-button',
    props: {
        preset: {
            type: String,
            default: 'transparent',
            validator: (value) => {
                return ['primary', 'secondary', 'transparent'].indexOf(value) !== -1
            },
        },
        label: {
            type: String,
            default: 'label',
        },
        size: {
            type: String,
            default: 'medium',
            validator: function (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1
            },
        },
        uppercase: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const BASE_STYLES = 'font-display border-2 rounded-full transition'

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
                transparent: [
                    'bg-transparent text-white/90 border-white/90 bg-black/25',
                    'hover:bg-black/50',
                    'active:bg-black/75 active:text-white/50 active:border-white/50',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
                round: [
                    'bg-white text-purple-dark border-purple-dark',
                    'hover:bg-purple-dark hover:text-white hover:purple-dark',
                    'active:bg-purple-extra-dark active:text-white',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
            }
            return presetStyleMapping[preset.value] || ''
        })
        const computedSpacingStyles = computed(() => {
            const spacingMapping = {
                large: ['px-6 py-1'],
                medium: ['px-4 py-1'],
                small: ['px-3'],
            }
            return spacingMapping[size.value] || ''
        })
        const computedSizeStyles = computed(() => {
            const sizeStyleMapping = {
                large: ['font-bold text-lg'],
                medium: ['font-semibold text-base'],
                small: ['font-semibold text-sm'],
            }
            return sizeStyleMapping[size.value] || ''
        })
        const computedStyles = computed(() => {
            return [
                BASE_STYLES,
                computedPresetStyles.value,
                computedSizeStyles.value,
                computedSpacingStyles.value,
                props.uppercase && 'uppercase',
            ]
        })

        return {
            computedStyles,
        }
    },
}
</script>
