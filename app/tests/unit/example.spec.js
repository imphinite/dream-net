import { shallowMount } from '@vue/test-utils'
import Button from '@/components/atoms/button.vue'

console.log('Button', Button)

describe('Testing', () => {
    it('1 + 1 = 2', () => {
        // const wrapper = shallowMount(App)
        // expect(wrapper.exists()).toBe(true)
        expect(1 + 1).toEqual(2)
    })

    it('Button renders', () => {
        const wrapper = shallowMount(Button)
        expect(wrapper.exists()).toBe(true)
    })
})
