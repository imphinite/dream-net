import useActionEvents from '@sb/utils/use-action-events.js'
import DnBottomDrawer from '@co/bottom-drawer.vue'
import { ref } from 'vue'

export default {
    title: 'Organisms/Bottom Drawer',
    component: DnBottomDrawer,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        active: {
            table: { disable: true },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnBottomDrawer },
    setup() {
        const active = ref(true)
        const activeItem = ref()

        return {
            args,
            ...useActionEvents(argTypes),
            active,
            activeItem,
        }
    },
    template: `
        <div class="w-full h-full">
            <dn-bottom-drawer
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
            icon: 'eye-slash',
            label: 'Flag sensitive content',
        },
        {
            icon: 'ban',
            label: 'Cancel',
        },
    ],
}
