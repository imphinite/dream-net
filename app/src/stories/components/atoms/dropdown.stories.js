import useActionEvents from '@sb/utils/use-action-events.js'
import DnDropdown from '@ca/dropdown.vue'
import DnBottomDrawer from '@co/bottom-drawer.vue'
import { ref } from 'vue'

export default {
    title: 'Atoms/Dropdown',
    component: DnDropdown,
    argTypes: {
        modelValue: {
            table: {
                disable: true,
            },
        },
        'update:modelValue': {
            table: {
                disable: true,
            },
        },
        type: {
            options: ['text', 'email', 'password'],
            control: {
                type: 'select',
            },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnDropdown, DnBottomDrawer },
    setup() {
        const inputValue = ref('')
        const items = ref([
            {
                icon: 'eye-slash',
                label: 'Flag sensitive content',
            },
            {
                icon: 'ban',
                label: 'Cancel',
            },
        ])

        return {
            args,
            ...useActionEvents(argTypes),
            inputValue,
            items,
        }
    },
    template: `
        <dn-dropdown
            v-bind="args"
            v-on="actionEvents"
            :items="items"
            :model-value="inputValue"
            @update:model-value="inputValue = $event"
            >
        </dn-dropdown>
    `,
})

export const Default = Template.bind({})
Default.args = {}
