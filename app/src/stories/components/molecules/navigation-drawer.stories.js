import useActionEvents from '@sb/utils/use-action-events.js'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import { ref } from 'vue'

export default {
    title: 'Organism/Navigation Drawer',
    component: DnNavigationDrawer,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        active: {
            table: { disable: true },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnNavigationDrawer },
    setup() {
        const active = ref(true)

        return {
            args,
            ...useActionEvents(argTypes),
            active,
        }
    },
    template:
        '<dn-navigation-drawer v-bind="args" v-on="actionEvents" :model-value="active" @update:model-value="active=$event" />',
})

export const Default = Template.bind({})
Default.args = {}
