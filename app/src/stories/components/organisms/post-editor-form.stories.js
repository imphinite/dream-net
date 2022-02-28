import useActionEvents from '@sb/utils/use-action-events.js'
import DnPostEditorForm from '@co/post-editor-form.vue'

export default {
    title: 'Organisms/Post Editor Form',
    component: DnPostEditorForm,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnPostEditorForm },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-post-editor-form v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
