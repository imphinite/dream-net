import DnHeader from '@cm/header.vue'

export default {
    title: 'Molecules/Header',
    component: DnHeader,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnHeader },
    setup() {
        return { args }
    },
    template: '<dn-header v-bind="args"/>',
})

export const Default = Template.bind({})
Default.args = {}
