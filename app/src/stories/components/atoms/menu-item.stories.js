import useActionEvents from '@sb/utils/use-action-events.js'
import DnMenuItem from '@ca/menu-item.vue'

export default {
    title: 'Atoms/Menu Item',
    component: DnMenuItem,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnMenuItem },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-menu-item v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
