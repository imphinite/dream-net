import DnFooter from '@cm/footer.vue'

export default {
    title: 'Molecules/Footer',
    component: DnFooter,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnFooter },
    setup() {
        return { args }
    },
    template: '<dn-footer v-bind="args"/>',
})

export const Default = Template.bind({})
Default.args = {}
