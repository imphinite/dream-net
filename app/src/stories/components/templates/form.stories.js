import useActionEvents from '@sb/utils/use-action-events.js'
import DnForm from '@ct/form.vue'

export default {
    title: 'Templates/Form',
    component: DnForm,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnForm },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-form v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
