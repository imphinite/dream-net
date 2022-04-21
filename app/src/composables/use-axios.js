import axios from 'axios'
import useStore from '@/store/use-store'
import useLoading from '@/composables/use-loading'

const { loading } = useLoading()

const instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 20000,
})

// Request interceptor
instance.interceptors.request.use(
    async (config) => {
        loading.value = true

        // Set auth bearer token to header
        const { auth: authModule } = useStore()
        const { isAuthenticated, bearerToken } = authModule
        config.headers['Authorization'] = isAuthenticated.value
            ? bearerToken.value
            : null

        return config
    },
    (error) => {
        delete config.headers['Authorization']
        loading.value = false

        return Promise.reject(error)
    }
)

// Response interceptor
instance.interceptors.response.use((response) => {
    loading.value = false

    return response.data
})

export default () => {
    return instance
}
