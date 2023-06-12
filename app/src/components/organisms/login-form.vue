<template>
    <form
        method="post"
        :class="formStyles"
        @keydown.enter.prevent="$emit('submit', formData)"
    >
        <div>
            <div :class="inputContainerStyles">
                <dn-email-input v-model="formData.email" :disabled="disabled" />
            </div>
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.password"
                    type="password"
                    placeholder="Password"
                    :disabled="disabled"
                />
            </div>
        </div>

        <!-- Button group -->
        <div class="flex items-center justify-between">
            <dn-button
                preset="secondary"
                class="w-full"
                @click="$emit('submit', formData)"
            >
                LOGIN
            </dn-button>
        </div>

        <div class="mt-10">
            <button
                class="text-blue-400"
                @click.prevent="$emit('forgot-password')"
            >
                Forgot password?
            </button>
            <div class="mt-4">
                <span>Not a member? </span>
                <button
                    class="text-blue-400"
                    @click.prevent="$emit('signup-form')"
                >
                    Sign up now
                </button>
            </div>
        </div>
    </form>
</template>

<script>
//-- External libraries
import { ref, computed, watch } from 'vue'

//-- Components
import DnTextInput from '@ca/text-input'
import DnEmailInput from '@cm/email-input'
import DnButton from '@ca/button'

export default {
    name: 'dn-login-form',
    emits: ['update:modelValue', 'forgot-password', 'submit', 'signup-form'],
    components: {
        DnTextInput,
        DnEmailInput,
        DnButton,
    },
    props: {
        modelValue: {
            type: Object,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const formStyles = computed(() => {
            return ['flex flex-col', 'p-4']
        })

        const inputContainerStyles = ['h-20']

        // v-model
        const formData = ref({})
        formData.value = props.modelValue || {
            email: '',
            password: '',
        }
        watch(formData.value, (newFormData) => {
            emit('update:modelValue', newFormData)
        })

        return {
            formStyles,
            inputContainerStyles,
            formData,
        }
    },
}
</script>
