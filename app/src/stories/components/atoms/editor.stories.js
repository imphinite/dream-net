import useActionEvents from '@sb/utils/use-action-events.js'
import DnEditor from '@ca/editor.vue'
import { ref } from 'vue'

export default {
    title: 'Atoms/Editor',
    component: DnEditor,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnEditor },
    setup() {
        const modelValue = ref({})
        modelValue.value = args.modelValue

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

const modelValue = {
    ops: [
        { insert: 'Gandalf', attributes: { bold: true } },
        { insert: ' the ' },
        { insert: 'Grey', attributes: { color: '#cccccc' } },
    ],
}

export const Default = Template.bind({})
Default.args = {
    modelValue,
}

export const Bubble = Template.bind({})
Bubble.args = {
    theme: 'bubble',
    dim: true,
    modelValue,
}

export const ReadOnly = Template.bind({})
ReadOnly.args = {
    readOnly: true,
    modelValue,
}
