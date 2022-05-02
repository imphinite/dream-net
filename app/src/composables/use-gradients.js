export default ({ hover = true, dim = false } = {}) => {
    const GRADIENTS = {
        VIRGIN_AMERICA: [
            dim
                ? 'from-[#7b4397]/75 to-[#dc2430]/75'
                : 'from-[#7b4397] to-[#dc2430]',
            hover && 'hover:from-[#7b4397]/75 hover:to-[#dc2430]/75',
        ],
        PURPLE_WHITE: [
            dim
                ? 'from-[#ba5370]/75 to-[#f4e2d8]/75'
                : 'from-[#ba5370] to-[#f4e2d8]',
            hover && 'hover:from-[#ba5370]/75 hover:to-[#f4e2d8]/75',
        ],
        ENDLESS_RIVER: [
            dim
                ? 'from-[#43cea2]/75 to-[#185a9d]/75'
                : 'from-[#43cea2] to-[#185a9d]',
            hover && 'hover:from-[#43cea2]/75 hover:to-[#185a9d]/75',
        ],
        BLOODY_MARY: [
            dim
                ? 'from-[#ff512f]/75 to-[#dd2476]/75'
                : 'from-[#ff512f] to-[#dd2476]',
            hover && 'hover:from-[#ff512f]/75 hover:to-[#dd2476]/75',
        ],
        CAN_YOU_FEEL_THE_LOVE_TONIGHT: [
            dim
                ? 'from-[#4568dc]/75 to-[#b06ab3]/75'
                : 'from-[#4568dc] to-[#b06ab3]',
            hover && 'hover:from-[#4568dc]/75 hover:to-[#b06ab3]/75',
        ],
        BOURBON: [
            dim
                ? 'from-[#ec6f66]/75 to-[#f3a183]/75'
                : 'from-[#ec6f66] to-[#f3a183]',
            hover && 'hover:from-[#ec6f66]/75 hover:to-[#f3a183]/75',
        ],
        DECENT: [
            dim
                ? 'from-[#4ca1af]/75 to-[#c4e0e5]/75'
                : 'from-[#4ca1af] to-[#c4e0e5]',
            hover && 'hover:from-[#4ca1af]/75 hover:to-[#c4e0e5]/75',
        ],
        SWEET_MORNING: [
            dim
                ? 'from-[#ff5f6d]/75 to-[#ffc371]/75'
                : 'from-[#ff5f6d] to-[#ffc371]',
            hover && 'hover:from-[#ff5f6d]/75 hover:to-[#ffc371]/75',
        ],
        SCOOTER: [
            dim
                ? 'from-[#36d1dc]/75 to-[#5b86e5]/75'
                : 'from-[#36d1dc] to-[#5b86e5]',
            hover && 'hover:from-[#36d1dc]/75 hover:to-[#5b86e5]/75',
        ],
        CELESTIAL: [
            dim
                ? 'from-[#c33764]/75 to-[#1d2671]/75'
                : 'from-[#c33764] to-[#1d2671]',
            hover && 'hover:from-[#c33764]/75 hover:to-[#1d2671]/75',
        ],
        ROYAL: [
            dim
                ? 'from-[#141e30]/75 to-[#243b55]/75'
                : 'from-[#141e30] to-[#243b55]',
            hover && 'hover:from-[#141e30]/75 hover:to-[#243b55]/75',
        ],
    }

    return {
        GRADIENTS,
    }
}
