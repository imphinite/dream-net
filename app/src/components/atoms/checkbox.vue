<template>
    <button :class="containerStyles" @click.prevent="toggleValue">
        <input type="hidden" :id="id" :name="name" :value="checkboxValue" />
        <div :class="textStyles">
            {{ label }}
        </div>
        <div
            class="flex items-center justify-center h-6 w-6 text-xl shrink-0"
            :class="iconColor"
        >
            <fa :icon="icon" />
        </div>
    </button>
</template>

<script>
//-- External libraries
import { computed, ref, watch } from 'vue'

export default {
    name: 'dn-checkbox',
    emits: ['update:modelValue', 'focus', 'blur'],
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        label: {
            type: String,
            default: 'Agree to Terms and Conditions',
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
            'shadow-sm',
        ]

        const HOVER_STYLES = ['hover:bg-black/10', 'transition']

        const containerStyles = computed(() => {
            return [BASE_STYLES, props.disabled ? '' : HOVER_STYLES]
        })

        const dividerStyles = computed(() => {
            return ['border-b-2', 'grow', 'mx-2']
        })

        const textStyles = computed(() => {
            return [
                'text-black/75 text-sm text-left',
                'line-clamp-2',
                props.disabled && 'text-gray-400',
            ]
        })

        //-- Data
        const checkboxValue = ref(props.modelValue)
        watch(checkboxValue, (newValue) => {
            emit('update:modelValue', newValue)
        })
        const toggleValue = () => {
            if (props.disabled) return
            checkboxValue.value = !Boolean(checkboxValue.value)
        }

        const icon = computed(() => {
            return checkboxValue.value ? 'check' : 'xmark'
        })

        const iconColor = computed(() => {
            if (props.disabled) {
                return 'text-gray-400'
            }
            return checkboxValue.value ? 'text-teal-default' : 'text-red-500'
        })

        return {
            containerStyles,
            dividerStyles,
            textStyles,
            icon,
            iconColor,
            checkboxValue,
            toggleValue,
        }
    },
}
</script>
