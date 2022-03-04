import useActionEvents from '@sb/utils/use-action-events.js'
import DnLoginForm from '@co/login-form.vue'

export default {
    title: 'Organisms/Login Form',
    component: DnLoginForm,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnLoginForm },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-login-form v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
