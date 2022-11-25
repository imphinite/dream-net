import useActionEvents from '@sb/utils/use-action-events.js'
import DnCheckbox from '@ca/checkbox.vue'
import { ref } from 'vue'

export default {
    title: 'Atoms/Checkbox',
    component: DnCheckbox,
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
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnCheckbox },
    setup() {
        const checkboxValue = ref(false)

        return {
            args,
            ...useActionEvents(argTypes),
            checkboxValue,
        }
    },
    template: `
        <dn-checkbox
            v-bind="args"
            v-on="actionEvents"
            :model-value="checkboxValue"
            @update:model-value="checkboxValue = $event"
            />
    `,
})

export const Default = Template.bind({})
Default.args = {}
