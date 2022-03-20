import { ref, computed } from 'vue'
import useAxios from '@/composables/use-axios'

const auth = ref()

const isAuthenticated = computed(() => {
    return Boolean(auth.access_token)
})

const axios = useAxios()

const login = async ({ username, password }) => {
    const { data } = await axios({
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

    auth.value = data
}

// TODO
const register = () => {}

export default () => {
    return {
        auth,
        isAuthenticated,
        login,
        register,
    }
}
