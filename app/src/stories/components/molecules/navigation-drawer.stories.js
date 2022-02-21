import useActionEvents from '@sb/utils/use-action-events.js'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import { ref } from 'vue'
import Lights from '@sb/assets/lights.jpeg'

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
            Lights,
        }
    },
    template: `
        <div class="w-full h-full">
            <img class="absolute w-full h-full" :src="Lights" />
            <dn-navigation-drawer v-bind="args" v-on="actionEvents" :model-value="active" @update:model-value="active=$event" />
        </div>
    `,
})

export const Default = Template.bind({})
Default.args = {}
