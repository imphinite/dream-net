import useActionEvents from '@sb/utils/use-action-events.js'
import DnCommentReplyForm from '@co/comment-reply-form.vue'

export default {
    title: 'Organisms/Comment Reply Form',
    component: DnCommentReplyForm,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnCommentReplyForm },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-comment-reply-form v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
