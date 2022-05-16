import useEnum from '@/composables/use-enum'

describe('use-enum', () => {
    it('Creates enums from array', () => {
        const result = useEnum(['apple', 'pear', 'grape'])
        expect(result).toEqual({
            apple: 'apple',
            pear: 'pear',
            grape: 'grape',
        })
    })
})
