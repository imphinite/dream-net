<template>
    <section :class="containerStyles">
        <dn-signup-form
            v-if="isSignupFormActive"
            @login-form="activeForm = forms.LOGIN_FORM"
            @submit="handleSignup"
        />
        <dn-login-form
            v-if="isLoginFormActive"
            @signup-form="activeForm = forms.SIGNUP_FORM"
            @submit="handleLogin"
        />
    </section>
</template>

<script>
import { ref, computed } from 'vue'
import DnLoginForm from '@co/login-form'
import DnSignupForm from '@co/signup-form'
import useAuthentication from '@/composables/use-authentication'
import useEnum from '@/composables/use-enum'
import useGradients from '@/composables/use-gradients'

export default {
    components: {
        DnLoginForm,
        DnSignupForm,
    },
    setup() {
        // Styles
        const { GRADIENTS } = useGradients({ hover: false })
        const containerStyles = [
            'flex flex-col',
            'w-full h-screen p-4',
            'bg-gradient-to-tr',
            GRADIENTS.CAN_YOU_FEEL_THE_LOVE_TONIGHT,
        ]

        // Forms
        const forms = useEnum(['LOGIN_FORM', 'SIGNUP_FORM'])
        const activeForm = ref(forms.SIGNUP_FORM)
        const isSignupFormActive = computed(() => {
            return activeForm.value === forms.SIGNUP_FORM
        })
        const isLoginFormActive = computed(() => {
            return activeForm.value === forms.LOGIN_FORM
        })

        const { login } = useAuthentication()

        // TODO
        const handleLogin = (event) => {
            login({
                username: 'mememe@qq.com',
                password: '123456',
            })
        }

        // TODO
        const handleSignup = () => {}

        return {
            containerStyles,
            forms,
            activeForm,
            isSignupFormActive,
            isLoginFormActive,
            handleSignup,
            handleLogin,
        }
    },
}
</script>
