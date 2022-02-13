import '@style/tailwind.css'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    layout: 'centered',
    backgrounds: {
        default: 'dark',
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'iphone5',
    },
}
