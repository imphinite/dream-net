<template>
    <section :class="baseStyles">
        <dn-signup-form
            v-if="isSignupFormActive"
            @login-form="activeForm = forms.LOGIN_FORM"
        />
        <dn-login-form
            v-if="isLoginFormActive"
            @signup-form="activeForm = forms.SIGNUP_FORM"
        />
    </section>
</template>

<script>
import DnLoginForm from '@co/login-form'
import DnSignupForm from '@co/signup-form'
import { ref, computed } from 'vue'
import useEnum from '@/composables/use-enum'

export default {
    name: 'dn-auth',
    components: {
        DnLoginForm,
        DnSignupForm,
    },
    setup() {
        const baseStyles = computed(() => {
            return ['flex flex-col']
        })

        // Forms
        const forms = useEnum(['LOGIN_FORM', 'SIGNUP_FORM'])
        const activeForm = ref(forms.SIGNUP_FORM)
        const isSignupFormActive = computed(() => {
            return activeForm.value === forms.SIGNUP_FORM
        })
        const isLoginFormActive = computed(() => {
            return activeForm.value === forms.LOGIN_FORM
        })

        return {
            baseStyles,
            forms,
            activeForm,
            isSignupFormActive,
            isLoginFormActive,
        }
    },
}
</script>
