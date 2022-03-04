<template>
    <div class="relative">
        <label v-show="label" class="text-white/75">{{ label }}</label>
        <input
            ref="inputRef"
            :type="type"
            :class="computedStyles"
            :placeholder="placeholder"
            :value="inputValue"
            @input="updateModelValue"
            @focus="focus = true"
            @blur="focus = false"
        />
        <button
            v-show="inputValue"
            :class="computedTrailingButtonStyles"
            @click="clearInput"
        >
            <fa icon="close" />
        </button>
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
        const BASE_STYLES = ['w-full', 'rounded-full', 'text-pink-500']

        const focus = ref(false)

        const computedStyles = computed(() => {
            return [BASE_STYLES]
        })

        const computedTrailingButtonStyles = computed(() => {
            return [
                'absolute right-2 bottom-1/2 translate-y-1/2',
                'rounded-full h-4/6 aspect-square',
                'bg-gray-600/75 hover:bg-black/75 active:bg-black',
                'text-white',
            ]
        })

        //-- data
        const inputRef = ref()
        const inputValue = ref()
        inputValue.value = props.modelValue

        const updateModelValue = () => {
            inputValue.value = inputRef.value.value
        }

        const clearInput = () => {
            inputValue.value = ''
            inputRef.value.focus()
        }

        watch(inputValue, (newInputValue) => {
            emit('update:modelValue', newInputValue)
        })

        return {
            computedStyles,
            computedTrailingButtonStyles,
            inputRef,
            inputValue,
            updateModelValue,
            focus,
            clearInput,
        }
    },
}
</script>
