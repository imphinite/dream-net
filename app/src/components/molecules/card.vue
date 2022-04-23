<template>
    <div :class="computedStyles">
        <!-- title block -->
        <div
            v-if="title"
            class="card-title font-bold text-2xl"
            @click="$emit('title-click')"
        >
            {{ title }}
        </div>

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
            <dn-icon-button class="ml-2" @click="$emit('comment-button-click')"
                ><fa icon="comment"
            /></dn-icon-button>
        </div>
    </div>
</template>

<script>
//-- Libraries
import _ from 'lodash'
import { computed } from 'vue'

//-- Components
import DnButton from '@ca/button.vue'
import DnIconButton from '@ca/icon-button.vue'
import DnEditor from '@ca/editor.vue'

export default {
    name: 'dn-card',
    components: {
        DnButton,
        DnIconButton,
        DnEditor,
    },
    emits: [
        'heart-button-click',
        'star-button-click',
        'comment-button-click',
        'title-click',
    ],
    props: {
        preset: {
            type: String,
            default: 'primary',
            validator: (value) => {
                return ['primary', 'secondary'].indexOf(value) !== -1
            },
        },
        dim: {
            type: Boolean,
            default: false,
        },
        rounded: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
        },
        content: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const BASE_STYLES = [
            'flex flex-col border-y border-white/25 p-2 w-full min-w-[80%]',
            'font-display text-white select-none',
        ]

        const BASE_BG = [props.dim && 'bg-black/25']

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
