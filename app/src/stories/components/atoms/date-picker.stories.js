import useActionEvents from '@sb/utils/use-action-events.js'
import DnDatePicker from '@ca/date-picker.vue'

export default {
    title: 'Atoms/Date Picker',
    component: DnDatePicker,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnDatePicker },
    setup() {
        return {
            args,
            ...useActionEvents(argTypes),
        }
    },
    template: '<dn-date-picker v-bind="args" v-on="actionEvents"/>',
})

export const Default = Template.bind({})
Default.args = {}
