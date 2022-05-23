<template>
    <div>
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
                :disabled="disabled"
                @input="updateModelValue"
                @focus="focus = true"
                @blur="focus = false"
            />
            <button
                v-show="inputValue"
                :class="computedTrailingButtonStyles"
                tabindex="-1"
                @click.prevent="clearInput"
            >
                <fa icon="close" />
            </button>
        </div>
        <slot name="error"></slot>
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
        rounded: {
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
            default: '',
        },
        placeholder: {
            type: String,
            default: 'Type something...',
        },
        dim: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        //-- styles
        const BASE_STYLES = [
            'w-full',
            'transition',
            'border-none focus:border-none',
            'focus:ring-2',
            // 'focus-visible:outline-none',
        ]

        const computedColors = computed(() => {
            return [
                props.dim ? 'text-white' : 'text-black/75',
                // props.dim ? 'border-none focus:border-none' : '',
                props.dim ? 'bg-black/25' : 'bg-white',
                props.dim ? 'focus:ring-white/75' : 'focus:ring-[#2563eb]',
            ]
        })

        const computedStyles = computed(() => {
            return [
                BASE_STYLES,
                computedColors.value,
                props.rounded ? 'rounded-full' : 'rounded',
            ]
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
        const inputValue = ref(props.modelValue)

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

        const focus = ref(false)
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
    methods: {
        keyupEnter() {
            console.log('text input keyup.enter')
        },
        keyupEnterButton() {
            console.log('icon button keyup.enter')
        },
    },
}
</script>
