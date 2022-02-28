import useActionEvents from '@sb/utils/use-action-events.js'
import DnEmailInput from '@cm/email-input.vue'

export default {
    title: 'Molecules/Email Input',
    component: DnEmailInput,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnEmailInput },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-email-input v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
