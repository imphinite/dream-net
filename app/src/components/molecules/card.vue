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
            v-model="content"
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
                    v-if="interactions.like"
                    icon-selected-color="pink"
                    :selected="liked"
                    :disabled="loading"
                    @click="$emit('heart-button-click')"
                    ><fa icon="heart"
                /></dn-icon-button>
                <dn-icon-button
                    v-if="interactions.favor"
                    class="ml-2"
                    icon-selected-color="yellow"
                    :selected="favored"
                    :disabled="loading"
                    @click="$emit('star-button-click')"
                    ><fa icon="star"
                /></dn-icon-button>
            </div>
            <div class="flex justify-between">
                <dn-icon-button
                    v-if="interactions.dislike"
                    class="ml-2"
                    icon-selected-color="red"
                    :selected="disliked"
                    :disabled="loading"
                    @click="$emit('dislike-button-click')"
                    ><fa icon="heart-crack"
                /></dn-icon-button>
                <dn-icon-button
                    v-if="interactions.reply"
                    class="ml-2"
                    :disabled="loading"
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
            type: Object,
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
        liked: {
            type: Boolean,
            default: false,
        },
        favored: {
            type: Boolean,
            default: false,
        },
        disliked: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
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
