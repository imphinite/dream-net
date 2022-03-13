import useActionEvents from '@sb/utils/use-action-events.js'
import DnEditor from '@ca/editor.vue'
import { ref, watch } from 'vue'

export default {
    title: 'Atoms/Editor',
    component: DnEditor,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnEditor },
    setup() {
        const modelValue = ref({})

        return {
            args,
            ...useActionEvents(argTypes),
            modelValue,
        }
    },
    template: `
        <dn-editor
            v-bind="args"
            v-on="actionEvents"
            :model-value="modelValue"
            @update:model-value="modelValue=$event"
        />
    `,
})

export const Default = Template.bind({})
Default.args = {}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
    readOnly: true,
}
