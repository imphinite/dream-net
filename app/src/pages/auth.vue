<template>
    <dn-page :header="false">
        <section :class="containerStyles">
            <dn-signup-form
                v-if="isSignupFormActive"
                :disabled="isLoading"
                @login-form="activeForm = forms.LOGIN_FORM"
                @submit="handleSignup"
            />
            <dn-login-form
                v-if="isLoginFormActive"
                :disabled="isLoading"
                @signup-form="activeForm = forms.SIGNUP_FORM"
                @submit="handleLogin"
            />
        </section>
    </dn-page>
</template>

<script>
//-- Libraries
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

//-- Components
import DnLoginForm from '@co/login-form'
import DnSignupForm from '@co/signup-form'
import DnPage from '@ct/page.vue'

//-- Store
import useStore from '@/store/use-store'

//-- Composables
import useAuthentication from '@/composables/use-authentication'
import useEnum from '@/composables/use-enum'
import useLoading from '@/composables/use-loading'
import { useRoute } from 'vue-router'

export default {
    components: {
        DnLoginForm,
        DnSignupForm,
        DnPage,
    },
    setup() {
        // Styles
        const containerStyles = [
            'flex flex-col',
            'w-full h-full p-4 overflow-hidden',
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

        // Handle data
        const { login, fetchSelfInfo, register } = useAuthentication()
        const { auth: authModule } = useStore()
        const { isAuthenticated, clearAuth } = authModule
        const router = useRouter()

        // Login and redirect to home
        const handleLogin = async (event) => {
            const { email, password } = event
            await login({
                username: email,
                password,
            })

            await fetchSelfInfo()

            router.push({ name: 'Home' })
        }

        // Sign up
        const handleSignup = async (event) => {
            const { email, displayName, password } = event
            await register({
                email,
                username: displayName,
                password,
            })

            activeForm.value = forms.LOGIN_FORM
        }

        // If logout route
        const route = useRoute()
        if (route.path === '/login') {
            activeForm.value = forms.LOGIN_FORM
        }

        return {
            containerStyles,
            forms,
            activeForm,
            isSignupFormActive,
            isLoginFormActive,
            handleSignup,
            handleLogin,
            isAuthenticated,
            clearAuth,
            authModule,
            ...useLoading(),
        }
    },
}
</script>
