import useAxios, {
    requestInterceptor,
    requestInterceptorOnError,
    responseInterceptor,
    responseInterceptorOnError,
} from '@/composables/use-axios'
import useLoading from '@/composables/use-loading'
import authModule from '@/store/modules/auth'

describe('use-axios', () => {
    const { isLoading } = useLoading()
    let config = {}
    const error = {}
    const mockResponse = {
        data: [{ id: 1 }],
        pagination: {},
    }

    beforeEach(() => {
        config = {}

        authModule.clearAuth()
    })

    it('axios instance', () => {
        const axiosInstance = useAxios()
        expect(typeof axiosInstance).toBe('function')
    })

    it('requestInterceptor -- unauthenticated', () => {
        requestInterceptor({
            headers: {},
        })
        expect(isLoading.value).toBe(false)

        requestInterceptor({
            globalLoading: true,
            headers: {},
        })
        expect(isLoading.value).toBe(true)
    })

    it('requestInterceptor -- authenticated', () => {
        authModule.storeAuth({
            access_token: 'valid_access_token',
        })

        requestInterceptor({
            globalLoading: true,
            headers: {},
        })
        expect(isLoading.value).toBe(true)
    })

    it('requestInterceptorOnError', async () => {
        try {
            await requestInterceptorOnError(error)
        } catch (e) {
            expect(e).toEqual(error)
        } finally {
            expect(isLoading.value).toBe(false)
        }
    })

    it('responseInterceptor', () => {
        const responseData = responseInterceptor(mockResponse)
        expect(isLoading.value).toBe(false)
        expect(responseData).toEqual([{ id: 1 }])
    })

    it('responseInterceptorOnError', async () => {
        try {
            await responseInterceptorOnError({
                response: mockResponse,
            })
        } catch (e) {
            expect(e).toEqual(mockResponse)
        } finally {
            expect(isLoading.value).toBe(false)
        }
    })
})
