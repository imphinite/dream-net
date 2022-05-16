import authModule from '@/store/modules/auth'

describe('auth module', () => {
    const {
        data,
        isAuthenticated,
        bearerToken,
        storeAuth,
        clearAuth,
        storeUserSelfInfo,
    } = authModule

    beforeEach(() => {
        clearAuth()
    })

    it('data', () => {
        expect(data.value).toEqual({
            auth: null,
            user: null,
        })
    })

    it('isAuthenticated', () => {
        expect(isAuthenticated.value).toBe(false)
    })

    it('bearerToken', () => {
        expect(bearerToken.value).toBe(null)

        storeAuth({
            access_token: 'valid_access_token',
        })

        expect(bearerToken.value).toBe('Bearer valid_access_token')
    })

    it('storeAuth', async () => {
        expect(data.value.auth).toBe(null)
        storeAuth({
            access_token: 'valid_access_token',
        })
        expect(data.value.auth.access_token).toBe('valid_access_token')
    })

    it('clearAuth', async () => {
        clearAuth()
        expect(data.value).toEqual({
            auth: null,
            user: null,
        })
    })

    it('storeUserSelfInfo', async () => {
        const mockUser = {
            id: 2,
            name: 'test_user',
        }

        storeUserSelfInfo(mockUser)
        expect(data.value.user).toEqual(mockUser)
    })
})
