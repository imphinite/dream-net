import useActionEvents from '@sb/utils/use-action-events.js'
import DnProgressBar from '@ca/progress-bar.vue'

export default {
    title: 'Atoms/Progress Bar',
    component: DnProgressBar,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnProgressBar },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-progress-bar v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
