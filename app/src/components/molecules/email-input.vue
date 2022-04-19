<template>
    <dn-text-input
        type="email"
        :id="id"
        name="email"
        v-model="modelValue"
        placeholder="Email"
        :disabled="disabled"
    >
        <template v-slot:error>
            <div v-show="!isEmailValid" :class="errorStyles">
                {{ validationErrorMessage }}
            </div>
        </template>
    </dn-text-input>
</template>

<script>
import DnTextInput from '@ca/text-input'
import { watch, toRef, ref } from 'vue'

export default {
    name: 'dn-email-input',
    components: {
        DnTextInput,
    },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
        id: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const errorStyles = ['px-4 py-1', 'text-sm text-red-400']
        const modelValue = toRef(props, 'modelValue')
        const isEmailValid = ref(true)

        const validationErrorMessage = 'Must be a valid email'

        watch(modelValue, (newValue) => {
            isEmailValid.value = true
            if (Boolean(newValue)) {
                isEmailValid.value = validateEmailInput(newValue)
            }
        })

        const validateEmailInput = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        }

        // v-model
        watch(modelValue, (newModelValue) => {
            emit('update:modelValue', newModelValue)
        })

        return {
            errorStyles,
            isEmailValid,
            validationErrorMessage,
        }
    },
}
</script>
