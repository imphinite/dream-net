import useActionEvents from '@sb/utils/use-action-events.js'
import DnSignupForm from '@co/signup-form.vue'
import { ref } from 'vue'

export default {
    title: 'Organisms/Signup Form',
    component: DnSignupForm,
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
    components: { DnSignupForm },
    setup() {
        const formData = ref({})

        return {
            args,
            ...useActionEvents(argTypes),
            formData,
        }
    },
    template: `
        <dn-signup-form
            v-bind="args"
            v-on="actionEvents"
            :model-value="formData"
            @update:model-value="formData = $event"
            />
    `,
})

export const Default = Template.bind({})
Default.args = {}
