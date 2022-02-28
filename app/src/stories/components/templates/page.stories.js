import DnPage from '@ct/page.vue'
import * as HeaderStories from '@stories/components/molecules/header.stories.js'

export default {
    title: 'Templates/Page',
    component: DnPage,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnPage },
    setup() {
        return { args }
    },
    template: '<dn-page v-bind="args" />',
})

export const Default = Template.bind({})
Default.args = {
    // More on composing args: https://storybook.js.org/docs/vue/writing-stories/args#args-composition
    ...HeaderStories.Default.args,
}
