import useTheme from '@/composables/use-theme'

describe('use-theme', () => {
    const { theme, themeStyles, themeOptions, setActiveTheme } = useTheme()

    it('provides global theme state manager', () => {
        expect(theme.value).toEqual('ROYAL')
        expect(themeStyles.value).toEqual([
            'from-[#141e30] to-[#243b55]',
            false,
        ])
        expect(themeOptions.value.length).toBe(11)
    })

    it('should setActiveTheme', () => {
        setActiveTheme('PURPLE_WHITE')
        expect(theme.value).toEqual('PURPLE_WHITE')
        expect(themeStyles.value).toEqual([
            'from-[#ba5370] to-[#f4e2d8]',
            false,
        ])
        expect(themeOptions.value.length).toBe(11)
    })
})
