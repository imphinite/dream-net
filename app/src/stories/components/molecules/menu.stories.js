import useActionEvents from '@sb/utils/use-action-events.js'
import DnMenu from '@cm/menu.vue'
import { ref } from 'vue'

export default {
    title: 'Molecules/Menu',
    component: DnMenu,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnMenu },
    setup() {
        const activeMenuItem = ref(args.items[0])

        return {
            args,
            ...useActionEvents(argTypes),
            activeMenuItem,
        }
    },
    template: `
        <dn-menu
            v-bind="args"
            v-on="actionEvents"
            :model-value="activeMenuItem"
            @update:model-value="activeMenuItem = $event"
            />
    `,
})

export const Default = Template.bind({})
Default.args = {
    items: [
        {
            icon: 'heart',
            label: 'item 1',
        },
        {
            icon: 'star',
            label: 'item 2',
        },
        {
            icon: 'thumbs-up',
            label: 'item 3',
        },
        {
            icon: 'thumbs-down',
            label: 'item 4',
        },
    ],
}
