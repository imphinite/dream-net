<template>
    <div>
        <label v-show="label" class="text-white/75">{{ label }}</label>
        <input
            ref="inputRef"
            :type="type"
            :class="computedStyles"
            :placeholder="placeholder"
            :value="inputValue"
            @input="updateModelValue"
        />
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
    name: 'dn-text-input',
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },
        type: {
            type: String,
            default: 'text',
            validator: (value) => {
                return ['text', 'email', 'password'].indexOf(value) !== -1
            },
        },
        label: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Type something...',
        },
    },
    setup(props, { emit }) {
        //-- styles
        const BASE_STYLES = ['w-full', 'rounded', 'text-pink-500']

        const computedStyles = computed(() => {
            return [BASE_STYLES]
        })

        //-- data
        const inputRef = ref()
        const inputValue = ref()
        inputValue.value = props.modelValue

        const updateModelValue = () => {
            inputValue.value = inputRef.value.value
        }

        watch(inputValue, (newInputValue) => {
            emit('update:modelValue', newInputValue)
        })

        return {
            inputRef,
            inputValue,
            computedStyles,
            updateModelValue,
        }
    },
}
</script>
