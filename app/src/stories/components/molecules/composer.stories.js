import { ref, watch } from 'vue'
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
        // ops: [
        //     { insert: 'Gandalf', attributes: { bold: true } },
        //     { insert: ' the ' },
        //     { insert: 'Grey', attributes: { color: '#cccccc' } },
        // ],

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
    // template: '<dn-composer v-bind="args" v-on="actionEvents"/>',
})

export const PostComposer = Template.bind({})
PostComposer.args = {
    title: true,
    modelValue: {
        title: 'Title',
        content: {
            ops: [
                { insert: 'Gandalf', attributes: { bold: true } },
                { insert: ' the ' },
                { insert: 'Grey', attributes: { color: '#cccccc' } },
            ],
        },
    },
}

export const CommentComposer = Template.bind({})
CommentComposer.args = {
    modelValue: {
        content: {
            ops: [
                { insert: 'Gandalf', attributes: { bold: true } },
                { insert: ' the ' },
                { insert: 'Grey', attributes: { color: '#cccccc' } },
            ],
        },
    },
}
