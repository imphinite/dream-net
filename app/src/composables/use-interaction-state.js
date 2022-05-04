const buildInteractionState = (
    { like, favor, dislike, reply } = {
        like: true,
        favor: true,
        dislike: true,
        reply: true,
    }
) => {
    const interactions = {
        like: {
            enabled: Boolean(like),
            active: false,
            loading: false,
        },
        favor: {
            enabled: Boolean(favor),
            active: false,
            loading: false,
        },
        dislike: {
            enabled: Boolean(dislike),
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
