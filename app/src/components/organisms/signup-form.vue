<template>
    <form
        method="post"
        :class="formStyles"
        @keydown.enter.prevent="handleKeyupEnter"
    >
        <div class="text-white text-xl font-bold self-center py-4">Sign Up</div>

        <!-- TODO: progress bar -->

        <div v-show="step == 1" class="text-white">
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
        <div v-show="step == 2" class="text-white">
            <div class="flex gap-2" :class="inputContainerStyles">
                <dn-text-input
                    ref="firstnameInput"
                    v-model="formData.firstName"
                    placeholder="First name"
                    :disabled="disabled"
                />
                <dn-text-input
                    v-model="formData.lastName"
                    placeholder="Last name"
                    :disabled="disabled"
                />
            </div>
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.displayName"
                    placeholder="Display name"
                    :disabled="disabled"
                />
            </div>
        </div>

        <!-- Button group -->
        <div class="flex items-center justify-between">
            <div class="left">
                <dn-button v-show="step >= 2" @click="step -= 1"
                    >Back</dn-button
                >
            </div>
            <div class="right">
                <dn-button v-show="step == 1" @click="step += 1"
                    >Next</dn-button
                >
                <dn-button v-show="step == 2" @click="$emit('submit', formData)"
                    >Sign up</dn-button
                >
            </div>
        </div>

        <div class="text-white mt-4">
            <span>Already a member? </span>
            <button class="text-blue-400" @click.prevent="$emit('login-form')">
                Login here
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
    name: 'dn-signup-form',
    emits: ['update:modelValue', 'submit', 'login-form'],
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
            return ['flex flex-col', 'w-full p-4']
        })

        const inputContainerStyles = ['h-20']

        // v-model
        const formData = ref({})
        formData.value = props.modelValue || {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            displayName: '',
        }
        watch(formData.value, (newFormData) => {
            emit('update:modelValue', newFormData)
        })

        // Progress
        const step = ref(1)

        return {
            formStyles,
            inputContainerStyles,
            formData,
            step,
        }
    },
    methods: {
        async handleKeyupEnter() {
            if (this.step == 1) {
                this.step += 1
            } else {
                this.$emit('submit', this.formData)
            }
        },
    },
}
</script>
