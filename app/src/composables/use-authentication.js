import { computed } from 'vue'
import useAxios from '@/composables/use-axios'
import useStore from '@/store/use-store'

//-- Getters
const { auth: authModule } = useStore()
const isAuthenticated = computed(() => authModule.isAuthenticated.value)

//-- Methods
const axios = useAxios()
const login = async ({ username, password }) => {
    const authData = await axios({
        method: 'post',
        url: 'oauth/token',
        data: {
            grant_type: 'password',
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET,
            username,
            password,
            scope: '*',
        },
    })

    authModule.storeAuth(authData)
}

const fetchSelfInfo = async () => {
    const userData = await axios({
        method: 'get',
        url: 'self',
    })

    authModule.storeUserSelfInfo(userData)
}

const register = async ({ username, email, password }) => {
    await axios({
        method: 'post',
        url: 'register',
        data: {
            username,
            email,
            password,
        },
    })
}

export default () => {
    return {
        isAuthenticated,
        login,
        register,
        fetchSelfInfo,
    }
}
