import useActionEvents from '@sb/utils/use-action-events.js'
import DnLoginForm from '@co/login-form.vue'
import { ref } from 'vue'

export default {
    title: 'Organisms/Login Form',
    component: DnLoginForm,
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
    components: { DnLoginForm },
    setup() {
        const formData = ref({})

        return {
            args,
            ...useActionEvents(argTypes),
            formData,
        }
    },
    template: `
        <dn-login-form
            v-bind="args"
            v-on="actionEvents"
            :model-value="formData"
            @update:model-value="formData = $event"
            />
    `,
})

export const Default = Template.bind({})
Default.args = {}
