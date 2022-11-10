<template>
    <form
        method="post"
        :class="formStyles"
        @keydown.enter.prevent="$emit('submit', formData)"
    >
        <div>
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.displayName"
                    placeholder="Display name"
                    :disabled="disabled"
                />
            </div>
            <!-- TODO Dropdown input -->
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.theme"
                    placeholder="Theme"
                    :disabled="disabled"
                />
            </div>
            <!-- TODO Dropdown input -->
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.gender"
                    placeholder="Gender"
                    :disabled="disabled"
                />
            </div>
            <!-- TODO Dropdown input -->
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.birthDate"
                    placeholder="Birth date"
                    :disabled="disabled"
                />
            </div>
            <!-- TODO Checkbox input -->
            <div :class="inputContainerStyles">
                <dn-text-input
                    v-model="formData.consent"
                    placeholder="I give my consent to share my data for research purposes"
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
                >SAVE</dn-button
            >
        </div>
    </form>
</template>

<script>
//-- External libraries
import { ref, computed, watch } from 'vue'

//-- Components
import DnButton from '@ca/button'
import DnEmailInput from '@cm/email-input'
import DnTextInput from '@ca/text-input'

export default {
    name: 'dn-login-form',
    emits: ['update:modelValue', 'forgot-password', 'submit', 'signup-form'],
    components: {
        DnButton,
        DnEmailInput,
        DnTextInput,
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
            displayName: '',
            theme: '',
            gender: '',
            birthDate: '',
            consent: '',
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
