import useActionEvents from '@sb/utils/use-action-events.js'
import DnTextInput from '@ca/text-input.vue'

export default {
    title: 'Atoms/Text Input',
    component: DnTextInput,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnTextInput },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-text-input v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
