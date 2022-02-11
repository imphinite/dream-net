import DnHeader from '@cm/header.vue'

export default {
    title: 'Molecules/Header',
    component: DnHeader,
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DnHeader },
    template:
        '<dn-header :user="user" @onLogin="onLogin" @onLogout="onLogout" @onCreateAccount="onCreateAccount" />',
})

export const LoggedIn = Template.bind({})
LoggedIn.args = {
    user: {},
}

export const LoggedOut = Template.bind({})
LoggedOut.args = {}
