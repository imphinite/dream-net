import DnLogo from '@ca/logo.vue'

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Atoms/Logo',
    component: DnLogo,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        preset: {
            control: { type: 'select' },
            options: ['primary', 'secondary'],
        },
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
        },
        uppercase: {
            control: { type: 'boolean' },
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
    components: { DnLogo },
    template: '<dn-logo v-bind="args" class="w-[960px] h-[820px] m-auto" />',
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    preset: 'primary',
    label: 'Primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
    preset: 'secondary',
    label: 'Secondary',
}

export const Transparent = Template.bind({})
Transparent.args = {
    preset: 'transparent',
    label: 'Transparent',
}

export const Large = Template.bind({})
Large.args = {
    preset: 'primary',
    size: 'large',
    label: 'Large',
}

export const Small = Template.bind({})
Small.args = {
    preset: 'primary',
    size: 'small',
    label: 'Small',
}
