import useActionEvents from '@sb/utils/use-action-events.js'
import DnNavigation from '@co/navigation.vue'

export default {
    title: 'Organism/Navigation',
    component: DnNavigation,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnNavigation },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-navigation v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
