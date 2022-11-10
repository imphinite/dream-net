<template>
    <button type="button" :class="computedStyles">
        <img :src="icon" class="object-cover blur-xl saturate-[.75]" />
        <div
            class="absolute left-0 top-0 w-full h-full flex justify-center items-center"
        >
            <div
                class="text-white font-bold absolute max-w-full w-full p-12 text-2xl"
            >
                <slot>
                    {{ label }}
                </slot>
            </div>
        </div>
    </button>
</template>

<script>
//-- External libraries
import { toRef, computed } from 'vue'

//-- Assets
import icon from '@/assets/icon.png'

export default {
    name: 'dn-image-button',
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
        const BASE_STYLES = [
            'relative flex align-center items-center overflow-hidden',
            'font-display',
            'rounded-lg',
            'transition',
        ]

        //-- refs
        const preset = toRef(props, 'preset')
        const size = toRef(props, 'size')

        //-- computed
        const computedPresetStyles = computed(() => {
            const presetStyleMapping = {
                transparent: [
                    'bg-black/50',
                    'hover:bg-black/50',
                    'active:bg-black/75',
                    'focus:ring-2 focus:ring-yellow-light',
                ],
            }
            return presetStyleMapping[preset.value] || ''
        })
        const computedStyles = computed(() => {
            return [
                BASE_STYLES,
                computedPresetStyles.value,
                props.uppercase && 'uppercase',
            ]
        })

        return {
            computedStyles,
            icon,
        }
    },
}
</script>
