import useActionEvents from '@sb/utils/use-action-events.js'
import DnTextInput from '@ca/text-input.vue'
import { ref } from 'vue'

export default {
    title: 'Atoms/Text Input',
    component: DnTextInput,
    argTypes: {
        modelValue: {
            table: {
                disable: true,
            },
        },
        'update:modelValue': {
            table: {
                disable: true,
            },
        },
        type: {
            options: ['text', 'email', 'password'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnTextInput },
    setup() {
        const inputValue = ref('')

        return {
            args,
            ...useActionEvents(argTypes),
            inputValue,
        }
    },
    template: `
        <dn-text-input
            v-bind="args"
            v-on="actionEvents"
            :model-value="inputValue"
            @update:model-value="inputValue = $event"
            />
    `,
})

export const Default = Template.bind({})
Default.args = {}
