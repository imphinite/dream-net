import useActionEvents from '@sb/utils/use-action-events.js'
import DnEmailInput from '@cm/email-input.vue'
import { ref } from 'vue'

export default {
    title: 'Molecules/Email Input',
    component: DnEmailInput,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnEmailInput },
    setup() {
        const email = ref('input')

        return {
            args,
            ...useActionEvents(argTypes),
            email,
        }
    },
    template: `
        <dn-email-input
            v-bind="args"
            v-on="actionEvents"
            v-model="email"
            />
        `,
})

export const Default = Template.bind({})
Default.args = {}
