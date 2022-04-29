import DnIconButton from '@ca/icon-button.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Atoms/Icon Button',
    component: DnIconButton,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        preset: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'transparent'],
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        iconSelectedStyles: {
            control: { type: 'select' },
            options: ['pink', 'yellow', 'red'],
        },
    },
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    setup() {
        console.log('args.selected', args.selected)

        return {
            args,
        }
    },
    components: { DnIconButton },
    template: `<dn-icon-button v-bind="args" />`,
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    preset: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
    preset: 'secondary',
}

export const Transparent = Template.bind({})
Transparent.args = {
    preset: 'transparent',
}

export const Large = Template.bind({})
Large.args = {
    preset: 'primary',
    size: 'large',
}

export const Small = Template.bind({})
Small.args = {
    preset: 'primary',
    size: 'small',
}
