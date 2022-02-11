import DnButton from '@ca/button.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Atoms/Button',
    component: DnButton,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        backgroundColor: { control: 'color' },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
    },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
        return {
            args,
        }
    },
    components: { DnButton },
    template: '<dn-button @onClick="onClick" v-bind="args" />',
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    primary: true,
    label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
    label: 'Button',
}

export const Large = Template.bind({})
Large.args = {
    size: 'large',
    label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
    size: 'small',
    label: 'Button',
}
