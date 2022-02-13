import DnCard from '@ca/card.vue'

export default {
    title: 'Atoms/Card',
    component: DnCard,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnCard },
    template: '<dn-card />',
})

export const Default = Template.bind({})
Default.args = {}
