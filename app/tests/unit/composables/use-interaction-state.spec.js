import useInteractionState from '@/composables/use-interaction-state'

describe('use-interaction-state', () => {
    const defaultState = {
        enabled: false,
        active: false,
        loading: false,
    }

    it('compiles state for all interactions', () => {
        const { buildInteractionState } = useInteractionState()
        const interactions = buildInteractionState()
        expect(interactions).toEqual({
            like: {
                ...defaultState,
                enabled: true,
            },
            favor: {
                ...defaultState,
                enabled: true,
            },
            dislike: {
                ...defaultState,
                enabled: true,
            },
            reply: {
                ...defaultState,
                enabled: true,
            },
        })
    })
})
