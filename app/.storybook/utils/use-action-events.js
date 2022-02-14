import _ from 'lodash'
import { action } from '@storybook/addon-actions'

export default (argTypes) => {
    const eventsByArgTypes = Object.entries(argTypes).filter(
        (argType) => argType?.[1]?.table?.category === 'events'
    )

    const events = eventsByArgTypes.map((eventByArgType) => eventByArgType[0])

    const actionEvents = {}
    events.map((event) => {
        actionEvents[_.camelCase(event)] = action(_.kebabCase(event))
    })

    return {
        actionEvents,
    }
}
