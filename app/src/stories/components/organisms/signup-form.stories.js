import useActionEvents from '@sb/utils/use-action-events.js'
import DnSignupForm from '@co/signup-form.vue'

export default {
    title: 'Organisms/Signup Form',
    component: DnSignupForm,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnSignupForm },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-signup-form v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
