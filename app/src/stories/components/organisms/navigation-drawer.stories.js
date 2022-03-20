import useActionEvents from '@sb/utils/use-action-events.js'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import { ref } from 'vue'
import Lights from '@sb/assets/lights.jpeg'

export default {
    title: 'Organisms/Navigation Drawer',
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
        const activeItem = ref(args.menuItems[1])

        return {
            args,
            ...useActionEvents(argTypes),
            active,
            activeItem,
            Lights,
        }
    },
    template: `
        <div class="w-full h-full">
            <img class="absolute w-full h-full" :src="Lights" />
            <dn-navigation-drawer
                v-bind="args"
                v-on="actionEvents"
                :model-value="active"
                @update:model-value="active=$event"
                v-model:active-item="activeItem"
            />
        </div>
    `,
})

export const Default = Template.bind({})
Default.args = {
    menuItems: [
        {
            icon: 'home',
            label: 'Home',
        },
        {
            icon: 'star',
            label: 'Favorites',
        },
        {
            icon: 'book',
            label: 'History',
        },
        {
            icon: 'gear',
            label: 'Settings',
        },
        {
            icon: 'user',
            label: 'Sign out',
        },
    ],
}
