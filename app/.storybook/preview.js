import { app } from '@storybook/vue3'
import '@style/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

library.add(fas)

app.component('fa', FontAwesomeIcon)

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    backgrounds: {
        default: 'dark',
    },
    viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'iphone5',
    },
    // Set the viewports in Chromatic at the global level.
    chromatic: { viewports: [320, 428] },
    layout: 'fullscreen',
}
