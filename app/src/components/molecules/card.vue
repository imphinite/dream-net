<template>
    <div :class="computedStyles">
        <!-- title block -->
        <div class="card-title font-bold uppercase text-2xl">title</div>

        <!-- content block -->
        <dn-editor v-if="content" :content="content" read-only />
        <div v-else class="card-body text-sm line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
        </div>

        <!-- footer block -->
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
import { computed } from 'vue'
import DnButton from '@ca/button.vue'
import DnIconButton from '@ca/icon-button.vue'
import DnEditor from '@ca/editor.vue'
import _ from 'lodash'

export default {
    name: 'dn-card',
    components: {
        DnButton,
        DnIconButton,
        DnEditor,
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
        rounded: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: 'title',
        },
        content: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const BASE_STYLES = [
            'flex flex-col border-2 border-black/50 p-2 w-full min-w-[80%]',
            'font-display text-white select-none',
        ]

        const GRADIENTS = {
            VIRGIN_AMERICA: [
                'from-[#7b4397] to-[#dc2430]',
                'hover:from-[#7b4397]/75 hover:to-[#dc2430]/75',
            ],
            PURPLE_WHITE: [
                'from-[#ba5370] to-[#f4e2d8]',
                'hover:from-[#ba5370]/75 hover:to-[#f4e2d8]/75',
            ],
            ENDLESS_RIVER: [
                'from-[#43cea2] to-[#185a9d]',
                'hover:from-[#43cea2]/75 hover:to-[#185a9d]/75',
            ],
            BLOODY_MARY: [
                'from-[#ff512f] to-[#dd2476]',
                'hover:from-[#ff512f]/75 hover:to-[#dd2476]/75',
            ],
            CAN_YOU_FEEL_THE_LOVE_TONIGHT: [
                'from-[#4568dc] to-[#b06ab3]',
                'hover:from-[#4568dc]/75 hover:to-[#b06ab3]/75',
            ],
            BOURBON: [
                'from-[#ec6f66] to-[#f3a183]',
                'hover:from-[#ec6f66]/75 hover:to-[#f3a183]/75',
            ],
            DECENT: [
                'from-[#4ca1af] to-[#c4e0e5]',
                'hover:from-[#4ca1af]/75 hover:to-[#c4e0e5]/75',
            ],
            SWEET_MORNING: [
                'from-[#ff5f6d] to-[#ffc371]',
                'hover:from-[#ff5f6d]/75 hover:to-[#ffc371]/75',
            ],
            SCOOTER: [
                'from-[#36d1dc] to-[#5b86e5]',
                'hover:from-[#36d1dc]/75 hover:to-[#5b86e5]/75',
            ],
            CELESTIAL: [
                'from-[#c33764] to-[#1d2671]',
                'hover:from-[#c33764]/75 hover:to-[#1d2671]/75',
            ],
            ROYAL: [
                'from-[#141e30] to-[#243b55]',
                'hover:from-[#141e30]/75 hover:to-[#243b55]/75',
            ],
        }

        const BASE_BG = [
            'bg-gradient-to-tr',
            GRADIENTS.CAN_YOU_FEEL_THE_LOVE_TONIGHT,
        ]

        const computedStyles = computed(() => {
            return [BASE_STYLES, BASE_BG, props.rounded && 'rounded-xl']
        })

        const hasContent = computed(() => !_.isEmpty(props.content))

        return {
            computedStyles,
            hasContent,
        }
    },
}
</script>
