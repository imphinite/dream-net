<template>
    <div :class="computedStyles">
        <!-- title block -->
        <div class="card-title font-bold uppercase text-2xl">title</div>

        <!-- content block -->
        <dn-editor v-if="hasContent" :content="content" :read-only="true" />
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
import useGradients from '@/composables/use-gradients'

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

        const { GRADIENTS } = useGradients()

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
