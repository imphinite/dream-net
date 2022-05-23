<template>
    <div :class="computedStyles">
        <!-- title block -->
        <div
            v-if="title"
            class="card-title font-bold text-2xl bg-white/10 rounded px-2 py-1"
            @click="$emit('title-click')"
        >
            {{ title }}
        </div>

        <!-- content block -->
        <dn-editor
            v-if="hasContent"
            :model-value="deltaContent"
            theme="bubble"
            read-only
        />
        <div v-else class="card-body text-sm line-clamp-2">
            No content loaded.
        </div>

        <!-- footer block -->
        <div class="card-footer flex justify-between pt-2">
            <div class="flex justify-between">
                <dn-icon-button
                    v-if="state.like.enabled"
                    icon-selected-color="pink"
                    :selected="state.like.active"
                    :disabled="state.like.loading"
                    @click="$emit('heart-button-click', state)"
                    ><fa icon="heart"
                /></dn-icon-button>
                <dn-icon-button
                    v-if="state.favor.enabled"
                    class="ml-2"
                    icon-selected-color="yellow"
                    :selected="state.favor.active"
                    :disabled="state.favor.loading"
                    @click="$emit('star-button-click', state)"
                    ><fa icon="star"
                /></dn-icon-button>
            </div>
            <div class="flex justify-between">
                <dn-icon-button
                    v-if="state.dislike.enabled"
                    class="ml-2"
                    icon-selected-color="red"
                    :selected="state.dislike.active"
                    :disabled="state.dislike.loading"
                    @click="$emit('dislike-button-click', state)"
                    ><fa icon="heart-crack"
                /></dn-icon-button>
                <dn-icon-button
                    v-if="state.reply.enabled"
                    class="ml-2"
                    :disabled="state.reply.loading"
                    @click="$emit('reply-button-click')"
                    ><fa icon="comment"
                /></dn-icon-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-title {
    text-shadow: 0 0 4px black;
}
</style>

<script>
//-- Libraries
import _ from 'lodash'
import { computed } from 'vue'

//-- Components
import DnIconButton from '@ca/icon-button.vue'
import DnEditor from '@ca/editor.vue'

//-- Composables
import useInteractionState from '@/composables/use-interaction-state'

const { buildInteractionState } = useInteractionState()

export default {
    name: 'dn-card',
    components: {
        DnIconButton,
        DnEditor,
    },
    emits: [
        'title-click',
        'heart-button-click',
        'star-button-click',
        'dislike-button-click',
        'reply-button-click',
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
            type: [Object, String],
            default: () => {},
        },
        interactions: {
            type: Object,
            default: () => {
                return {
                    like: true,
                    favor: true,
                    dislike: false,
                    reply: false,
                }
            },
        },
        state: {
            type: Object,
            default: () => {
                return buildInteractionState()
            },
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

        const getDeltaContent = (rawContent) => {
            let content, delta

            if (typeof rawContent === 'string') {
                try {
                    delta = JSON.parse(rawContent)
                    content = delta
                } catch (err) {
                    content = {
                        ops: [{ insert: rawContent }],
                    }
                }

                return content
            }

            return props.content
        }

        const deltaContent = getDeltaContent(props.content)

        return {
            computedStyles,
            hasContent,
            deltaContent,
        }
    },
}
</script>
