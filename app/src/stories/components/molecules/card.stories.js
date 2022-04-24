import useActionEvents from '@sb/utils/use-action-events.js'
import DnCard from '@cm/card.vue'

export default {
    title: 'Molecules/Card',
    component: DnCard,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnCard },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-card v-bind="args" v-on="actionEvents"/>',
})

export const Compact = Template.bind({})
Compact.args = {
    title: 'Card Title',
    content: {
        ops: [
            { insert: 'Gandalf', attributes: { bold: true } },
            { insert: ' the ' },
            { insert: 'Grey', attributes: { color: '#cccccc' } },
        ],
    },
}
