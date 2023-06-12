const buildInteractionState = (
    { like, favor, sensitive, reply } = {
        like: true,
        favor: true,
        sensitive: true,
        reply: true,
    }
) => {
    const interactions = {
        like: {
            enabled: Boolean(like),
            active: false,
            count: '1.1k',
            loading: false,
        },
        favor: {
            enabled: Boolean(favor),
            active: false,
            count: '243',
            loading: false,
        },
        sensitive: {
            enabled: Boolean(sensitive),
            active: false,
            loading: false,
        },
        reply: {
            enabled: Boolean(reply),
            active: false,
            loading: false,
        },
    }

    return interactions
}

export default () => {
    return {
        buildInteractionState,
    }
}
