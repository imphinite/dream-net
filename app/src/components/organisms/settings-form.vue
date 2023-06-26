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
            <div :class="inputContainerStyles">
                <dn-dropdown
                    v-model="formData.theme"
                    placeholder="Theme"
                    :disabled="disabled"
                    :items="themeOptions"
                />
            </div>
            <div :class="inputContainerStyles">
                <dn-dropdown
                    v-model="formData.gender"
                    placeholder="Gender"
                    :disabled="disabled"
                    :items="genderOptions"
                />
            </div>
            <div :class="inputContainerStyles">
                <dn-date-picker
                    v-model="formData.birthDate"
                    placeholder="Birth date"
                    :disabled="disabled"
                />
            </div>
            <div :class="inputContainerStyles">
                <dn-checkbox
                    v-model="formData.consent"
                    label="I give my consent to share my data for research purposes"
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
import DnCheckbox from '@ca/checkbox'
import DnDatePicker from '@ca/date-picker'
import DnDropdown from '@ca/dropdown'
import DnEmailInput from '@cm/email-input'
import DnTextInput from '@ca/text-input'

export default {
    name: 'dn-login-form',
    emits: ['update:modelValue', 'forgot-password', 'submit', 'signup-form'],
    components: {
        DnButton,
        DnCheckbox,
        DnDatePicker,
        DnDropdown,
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

        const themeOptions = ref([
            {
                label: 'Light',
                value: 'light',
            },
            {
                label: 'Dark',
                value: 'dark',
            },
        ])

        const genderOptions = ref([
            {
                label: 'Male',
                value: 'male',
            },
            {
                label: 'Female',
                value: 'female',
            },
            {
                label: 'Non-binary',
                value: 'non-binary',
            },
            {
                label: 'Prefer not to respond',
                value: null,
            },
        ])

        return {
            formStyles,
            inputContainerStyles,
            formData,
            themeOptions,
            genderOptions,
        }
    },
}
</script>
