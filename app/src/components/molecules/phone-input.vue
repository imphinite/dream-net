<template>
    <dn-text-input type="text" :id="id" name="phone" v-model="modelValue">
        <template v-slot:error>
            <div v-show="!isPhoneValid" class="text-red-400">
                {{ validationErrorMessage }}
            </div>
        </template>
    </dn-text-input>
</template>

<script>
import DnTextInput from '@ca/text-input'
import { watch, toRef, ref } from 'vue'

export default {
    name: 'dn-phone-input',
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
    },
    setup(props) {
        const modelValue = toRef(props, 'modelValue')
        const isPhoneValid = ref(true)

        const validationErrorMessage = 'Must be a valid phone number'

        watch(modelValue, (newValue) => {
            isPhoneValid.value = true
            if (Boolean(newValue)) {
                isPhoneValid.value = validatePhoneInput(newValue)
            }
        })

        const validatePhoneInput = (phone) => {
            // TODO
            return String(phone).match(/^[-0-9]+$/)
        }

        return {
            isPhoneValid,
            validationErrorMessage,
        }
    },
}
</script>
