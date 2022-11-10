<template>
    <section :class="baseStyles">
        <div class="mx-auto w-2/5">
            <img :src="logo" alt="logo" />
        </div>

        <div class="w-full flex p-4">
            <dn-button class="w-full flex align-center justify-start">
                <img class="inline w-8" :src="googleIcon" />
                <span class="ml-2 pt-[3px]">Sign up with Google</span>
            </dn-button>
        </div>

        <dn-divider />

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
//-- External libraries
import { ref, computed } from 'vue'

//-- Components
import DnButton from '@ca/button'
import DnDivider from '@ca/divider'
import DnLoginForm from '@co/login-form'
import DnSignupForm from '@co/signup-form'

//-- Composables
import useEnum from '@/composables/use-enum'

//-- Assets
import logo from '@/assets/favicon.png'
import googleIcon from '@/assets/logo_google_g_icon.png'

export default {
    name: 'dn-auth',
    components: {
        DnButton,
        DnDivider,
        DnLoginForm,
        DnSignupForm,
    },
    setup() {
        const baseStyles = computed(() => {
            return ['flex flex-col', 'w-full']
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
            logo,
            googleIcon,
        }
    },
}
</script>
