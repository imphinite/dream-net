<template>
    <button type="button" :class="computedStyles" @click="onClick">
        <slot>
            {{ label }}
        </slot>
    </button>
</template>

<script>
import '@style/components/button.css'
import { toRef, computed } from 'vue'

export default {
    name: 'dn-button',

    props: {
        preset: {
            type: String,
            default: 'primary',
            validator: (value) => {
                return ['primary', 'secondary'].indexOf(value) !== -1
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
            }
            return presetStyleMapping[preset.value] || ''
        })
        const computedSizeStyles = computed(() => {
            const sizeStyleMapping = {
                large: ['font-bold text-lg px-6 py-1'],
                medium: ['font-semibold text-base px-4 py-1'],
                small: ['font-semibold text-sm px-3'],
            }
            return sizeStyleMapping[size.value] || ''
        })
        const computedStyles = computed(() => {
            return [
                BASE_STYLES,
                computedPresetStyles.value,
                computedSizeStyles.value,
                props.uppercase && 'uppercase',
            ]
        })

        return {
            computedStyles,
        }
    },

    methods: {
        onClick() {
            this.$emit('onClick')
        },
    },
}
</script>
