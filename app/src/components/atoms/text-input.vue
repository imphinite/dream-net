<template>
    <div class="relative">
        <label v-show="label" class="text-white/75" :for="id || name">{{
            label
        }}</label>
        <input
            ref="inputRef"
            :class="computedStyles"
            :type="type"
            :id="id || name"
            :name="name"
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
    emits: ['update:modelValue', 'focus', 'blur'],
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
        id: {
            type: String,
        },
        name: {
            type: String,
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
        const BASE_STYLES = ['w-full', 'rounded-full', 'text-black/75']

        const focus = ref(false)

        const computedStyles = computed(() => {
            return [BASE_STYLES]
        })

        const computedTrailingButtonStyles = computed(() => {
            return [
                'absolute right-2 bottom-1/2 translate-y-1/2',
                'rounded-full h-4/6 aspect-square',
                'cursor-pointer',
                'transition',
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

        watch(focus, (newFocusValue) => {
            emit(newFocusValue ? 'focus' : 'blur')
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
