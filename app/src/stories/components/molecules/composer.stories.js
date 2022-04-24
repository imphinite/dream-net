import { ref } from 'vue'
import useActionEvents from '@sb/utils/use-action-events.js'
import DnComposer from '@cm/composer.vue'

export default {
    title: 'Molecules/Composer',
    component: DnComposer,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnComposer },
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
        <dn-composer
            v-bind="args"
            v-on="actionEvents"
            :model-value="modelValue"
            @update:model-value="modelValue=$event"
        />
    `,
})

const content = {
    ops: [
        { insert: 'Gandalf', attributes: { bold: true } },
        { insert: ' the ' },
        { insert: 'Grey', attributes: { color: '#cccccc' } },
    ],
}

export const PostComposer = Template.bind({})
PostComposer.args = {
    title: true,
    modelValue: {
        title: 'Title',
        content,
    },
}

export const CommentComposer = Template.bind({})
CommentComposer.args = {
    modelValue: {
        content,
    },
}
