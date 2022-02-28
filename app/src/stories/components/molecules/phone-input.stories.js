import useActionEvents from '@sb/utils/use-action-events.js'
import DnPhoneInput from '@cm/phone-input.vue'

export default {
    title: 'Molecules/Phone Input',
    component: DnPhoneInput,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnPhoneInput },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-phone-input v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
