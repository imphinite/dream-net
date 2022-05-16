import useAxios from '@/composables/use-axios'
import moxios from 'moxios'
import useAuthentication from '@/composables/use-authentication'
import authModule from '@/store/modules/auth'

describe('use-authentication', () => {
    let axiosInstance
    const mockUser = {
        id: 2,
        name: 'test_user',
    }

    beforeEach(() => {
        // import and pass your custom axios instance to this method
        axiosInstance = useAxios()
        moxios.install(axiosInstance)

        authModule.clearAuth()
    })

    afterEach(() => {
        // import and pass your custom axios instance to this method
        moxios.uninstall(axiosInstance)
    })

    const { isAuthenticated, login, register, fetchSelfInfo } =
        useAuthentication()

    it('isAuthenticated', () => {
        expect(isAuthenticated.value).toBe(false)

        authModule.storeAuth({
            access_token: 'valid_access_token',
        })
        expect(isAuthenticated.value).toBe(true)
    })

    it('login', async () => {
        expect(isAuthenticated.value).toBe(false)

        moxios.stubRequest('oauth/token', {
            status: 200,
            response: {
                access_token: 'valid_access_token',
            },
        })

        await login({ username: 'test_user', password: 'password' })

        expect(isAuthenticated.value).toBe(true)
    })

    it('fetchSelfInfo', async () => {
        moxios.stubRequest('self', {
            status: 200,
            response: mockUser,
        })

        await fetchSelfInfo()

        const { data } = authModule
        expect(data.value.user).toEqual(mockUser)
    })

    it('register', async () => {
        moxios.stubRequest('register', {
            status: 200,
            response: mockUser,
        })

        await register({
            username: 'username',
            email: 'email',
            password: 'password',
        })
    })
})
