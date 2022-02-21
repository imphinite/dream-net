import _ from 'lodash'
import { action } from '@storybook/addon-actions'

export default (argTypes) => {
    const eventsByArgTypes = Object.entries(argTypes).filter(
        (argType) => argType?.[1]?.table?.category === 'events'
    )

    const events = eventsByArgTypes.map((eventByArgType) => eventByArgType[0])

    const actionEvents = {}
    events.map((event) => {
        let eventName = _.camelCase(event)
        let actionEventName = _.kebabCase(event)

        const eventNameArray = event.split(':')
        // Handle edgecases such as 'update:modelValue'
        if (eventNameArray.length > 1) {
            eventName = `${eventNameArray[0]}:${_.camelCase(eventNameArray[1])}`
            actionEventName = `${eventNameArray[0]}:${_.kebabCase(
                eventNameArray[1]
            )}`
        }

        actionEvents[eventName] = action(actionEventName)
    })

    return {
        actionEvents,
    }
}
