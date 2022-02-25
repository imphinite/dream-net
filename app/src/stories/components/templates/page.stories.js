import DnPage from '@ct/page.vue'
import * as HeaderStories from '@stories/components/molecules/header.stories.js'

export default {
    title: 'Templates/Page',
    component: DnPage,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnPage },
    template: '<dn-page :user="user" />',
})

export const LoggedIn = Template.bind({})
LoggedIn.args = {
    // More on composing args: https://storybook.js.org/docs/vue/writing-stories/args#args-composition
    ...HeaderStories.LoggedIn.args,
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {
    ...HeaderStories.LoggedOut.args,
}
