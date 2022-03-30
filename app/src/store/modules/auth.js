import { computed } from 'vue'
import { useStorage } from '@vueuse/core'

//-- Centralized data
const data = useStorage('auth', {
    auth: null,
    user: null, // user Id
})

//-- Getter
const isAuthenticated = computed(() => {
    return Boolean(data?.value?.auth?.access_token)
})

const bearerToken = computed(() => {
    return isAuthenticated.value
        ? `Bearer ${data?.value?.auth?.access_token}`
        : null
})

//-- Methods
const storeAuth = (authData) => {
    data.value.auth = authData
}

const clearAuth = () => {
    data.value.auth = null
    data.value.user = null
}

const storeUserSelfInfo = (userData) => {
    data.value.user = userData
}

export default {
    data,
    isAuthenticated,
    bearerToken,
    storeAuth,
    clearAuth,
    storeUserSelfInfo,
}
