<template>
    <button type="button" :class="computedStyles" :disabled="disabled">
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
            default: 'transparent',
            validator: (value) => {
                return (
                    ['primary', 'secondary', 'transparent'].indexOf(value) !==
                    -1
                )
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
        selected: {
            type: Boolean,
            default: false,
        },
        iconColor: {
            type: String,
            default: 'white',
            validator: function (value) {
                return (
                    [
                        'pink',
                        'yellow',
                        'red',
                        'black',
                        'white',
                        'transparent',
                    ].indexOf(value) !== -1
                )
            },
        },
        iconSelectedColor: {
            type: String,
            validator: function (value) {
                return ['pink', 'yellow', 'red'].indexOf(value) !== -1
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const BASE_STYLES =
            'flex items-center justify-center font-display border-none rounded-full transition'

        //-- refs
        const preset = toRef(props, 'preset')
        const size = toRef(props, 'size')
        const selected = toRef(props, 'selected')
        const iconColor = toRef(props, 'iconColor')
        const iconSelectedColor = toRef(props, 'iconSelectedColor')

        //-- computed
        const computedIconSelectedColor = computed(() => {
            const selectedColorActive =
                selected.value && Boolean(iconSelectedColor.value)

            const iconColorMapping = {
                pink: 'text-pink-400',
                yellow: 'text-yellow-400',
                red: 'text-red-400',
            }

            return selectedColorActive
                ? iconColorMapping[iconSelectedColor.value]
                : ''
        })

        const computedIconColor = computed(() => {
            const iconColorMapping = {
                pink: 'text-pink-400',
                yellow: 'text-yellow-400',
                red: 'text-red-400',
                black: 'text-gray-500',
                white: 'text-white/90',
                transparent: 'text-transparent',
            }

            return (
                computedIconSelectedColor.value ||
                iconColorMapping[iconColor.value] ||
                'text-white/90'
            )
        })

        const computedPresetStyles = computed(() => {
            const presetStyleMapping = {
                primary: [
                    'bg-white text-purple-dark border-purple-dark',
                    'hover:bg-purple-dark hover:text-white hover:purple-dark',
                    'active:bg-purple-extra-dark active:text-white',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
                secondary: [
                    'bg-purple-default text-white border-purple-default',
                    'hover:bg-white hover:text-purple-default hover:border-gray-300',
                    'active:bg-gray-300 active:text-purple-default',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
                transparent: [
                    'bg-transparent border-white/90',
                    computedIconColor.value,
                    'hover:bg-black/10',
                    'active:bg-white/75 active:text-purple-extra-dark/50 active:border-white/50',
                    'focus:bg-white/75 focus:text-purple-extra-dark/50 focus:ring-2 focus:ring-yellow-light',
                ],
            }
            return presetStyleMapping[preset.value] || ''
        })
        const computedSizeStyles = computed(() => {
            const sizeStyleMapping = {
                large: ['font-extrabold text-3xl w-14 h-14'],
                medium: ['font-semibold text-base text-center w-9 h-9'],
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
