import useActionEvents from '@sb/utils/use-action-events.js'
import DnAuth from '@ct/auth.vue'

export default {
    title: 'Templates/Auth',
    component: DnAuth,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnAuth },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-auth v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
