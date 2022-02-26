<template>
    <div :class="computedStyles">
        <div class="card-title font-bold uppercase text-2xl">title</div>
        <div class="card-body text-sm line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
        </div>
        <div class="card-footer flex justify-between pt-2">
            <div class="flex justify-between">
                <dn-icon-button @click="$emit('heart-button-click')"
                    ><fa icon="heart"
                /></dn-icon-button>
                <dn-icon-button class="ml-2" @click="$emit('star-button-click')"
                    ><fa icon="star"
                /></dn-icon-button>
            </div>
            <dn-button @click="$emit('comment-button-click')"
                >Comment</dn-button
            >
        </div>
    </div>
</template>

<script>
import { toRef, computed } from 'vue'
import DnButton from '@ca/button.vue'
import DnIconButton from '@ca/icon-button.vue'

export default {
    name: 'dn-card',
    components: {
        DnButton,
        DnIconButton,
    },
    emits: ['heart-button-click', 'star-button-click', 'comment-button-click'],
    props: {
        preset: {
            type: String,
            default: 'primary',
            validator: (value) => {
                return ['primary', 'secondary'].indexOf(value) !== -1
            },
        },
        title: {
            type: String,
            default: 'title',
        },
        dismissable: {
            type: Boolean,
            default: false,
        },
        rounded: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const BASE_STYLES = [
            'flex flex-col border-2 border-black/50 p-2 w-full min-w-[80%]',
            'font-display text-white',
        ]

        const GRADIENTS = {
            VIRGIN_AMERICA: [
                'from-[#7b4397] to-[#dc2430]',
                'hover:from-[#7b4397]/50 hover:to-[#dc2430]/50',
            ],
            PURPLE_WHITE: [
                'from-[#ba5370] to-[#f4e2d8]',
                'hover:from-[#ba5370]/50 hover:to-[#f4e2d8]/50',
            ],
            ENDLESS_RIVER: [
                'from-[#43cea2] to-[#185a9d]',
                'hover:from-[#43cea2]/50 hover:to-[#185a9d]/50',
            ],
            BLOODY_MARY: [
                'from-[#ff512f] to-[#dd2476]',
                'hover:from-[#ff512f]/50 hover:to-[#dd2476]/50',
            ],
            CAN_YOU_FEEL_THE_LOVE_TONIGHT: [
                'from-[#4568dc] to-[#b06ab3]',
                'hover:from-[#4568dc]/50 hover:to-[#b06ab3]/50',
            ],
            BOURBON: [
                'from-[#ec6f66] to-[#f3a183]',
                'hover:from-[#ec6f66]/50 hover:to-[#f3a183]/50',
            ],
            DECENT: [
                'from-[#4ca1af] to-[#c4e0e5]',
                'hover:from-[#4ca1af]/50 hover:to-[#c4e0e5]/50',
            ],
            SWEET_MORNING: [
                'from-[#ff5f6d] to-[#ffc371]',
                'hover:from-[#ff5f6d]/50 hover:to-[#ffc371]/50',
            ],
            SCOOTER: [
                'from-[#36d1dc] to-[#5b86e5]',
                'hover:from-[#36d1dc]/50 hover:to-[#5b86e5]/50',
            ],
            CELESTIAL: [
                'from-[#c33764] to-[#1d2671]',
                'hover:from-[#c33764]/50 hover:to-[#1d2671]/50',
            ],
            ROYAL: [
                'from-[#141e30] to-[#243b55]',
                'hover:from-[#141e30]/50 hover:to-[#243b55]/50',
            ],
        }

        const BASE_BG = ['bg-gradient-to-tr', GRADIENTS.CELESTIAL]

        const computedStyles = computed(() => {
            return [BASE_STYLES, BASE_BG, props.rounded && 'rounded-xl']
        })

        return {
            computedStyles,
        }
    },
}
</script>
