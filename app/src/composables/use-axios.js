import axios from 'axios'
import useStore from '@/store/use-store'
import useLoading from '@/composables/use-loading'

const { loading } = useLoading()

const instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 20000,
})

// Request interceptor
export const requestInterceptor = async (config) => {
    if (config.globalLoading) {
        loading.value = true
    }

    // Set auth bearer token to header
    const { auth: authModule } = useStore()
    const { isAuthenticated, bearerToken } = authModule
    config.headers['Authorization'] = isAuthenticated.value
        ? bearerToken.value
        : null

    return config
}
export const requestInterceptorOnError = (error) => {
    loading.value = false

    return Promise.reject(error)
}

instance.interceptors.request.use(requestInterceptor, requestInterceptorOnError)

// Response interceptor
export const responseInterceptor = (response) => {
    loading.value = false

    return response.data
}
export const responseInterceptorOnError = (error) => {
    return Promise.reject(error.response)
}

instance.interceptors.response.use(
    responseInterceptor,
    responseInterceptorOnError
)

export default function () {
    return instance
}
