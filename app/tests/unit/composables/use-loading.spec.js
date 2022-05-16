import useLoading from '@/composables/use-loading'

describe('use-loading', () => {
    const { loading, isLoading } = useLoading()

    it('provides global loading state manager', () => {
        expect(loading.value).toEqual(false)
        expect(isLoading.value).toEqual(false)
    })

    it('isLoading getter', () => {
        loading.value = true
        expect(isLoading.value).toEqual(true)
    })
})
