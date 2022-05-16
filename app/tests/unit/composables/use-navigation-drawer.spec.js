import useNavigationDrawer from '@/composables/use-navigation-drawer'

describe('use-navigation-drawer', () => {
    const { navDrawer, activeItem } = useNavigationDrawer()

    it('provides global navigation drawer state manager', () => {
        expect(navDrawer.value).toEqual(false)
        expect(typeof activeItem.value).toEqual('undefined')
    })
})
