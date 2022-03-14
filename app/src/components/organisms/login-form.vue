<template>
    <form action="" method="post" :class="formStyles">
        <div class="text-white text-xl font-bold self-center py-4">Login</div>

        <div>
            <div :class="inputContainerStyles">
                <dn-email-input v-model="formData.email" />
            </div>
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.password"
                    type="password"
                    placeholder="Password"
                />
            </div>
        </div>

        <!-- Button group -->
        <div class="flex items-center justify-between">
            <button
                class="text-blue-400"
                @click.prevent="$emit('forgot-password')"
            >
                Forgot password?
            </button>
            <dn-button @click="$emit('submit', formData)">Login</dn-button>
        </div>

        <div class="text-white mt-4">
            <span>Not a member? </span>
            <button class="text-blue-400" @click.prevent="$emit('signup-form')">
                Sign up now
            </button>
        </div>
    </form>
</template>

<script>
import { ref, computed, watch } from 'vue'
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
