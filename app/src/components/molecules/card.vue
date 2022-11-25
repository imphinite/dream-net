<template>
    <div :class="computedStyles">
        <!-- title block -->
        <div class="flex flex-col p-2 bg-gray-400/10">
            <div class="flex">
                <div
                    class="flex place-self-center items-center h-12 w-12 justify-center rounded-full overflow-hidden border-white border-2 shrink-0"
                >
                    <img
                        class="object-cover h-12 w-12"
                        :src="computedUserData.avatar"
                        :alt="computedUserData.avatar"
                    />
                </div>
                <div class="grow">
                    <div
                        v-if="title"
                        class="font-bold text-lg px-2 py-1 line-clamp-2"
                        @click="$emit('title-click')"
                    >
                        {{ title }}
                    </div>
                </div>
            </div>
            <div class="text-xs text-right text-gray-500 min-w-[36px]">
                {{ timeAgo }}
            </div>
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
        <div
            class="card-footer flex justify-between p-2 bg-gray-400/10"
            v-if="interactions"
        >
            <div class="flex justify-between">
                <div class="flex items-center">
                    <dn-icon-button
                        v-if="state.like.enabled"
                        icon-color="black"
                        icon-selected-color="pink"
                        :selected="state.like.active"
                        :disabled="state.like.loading"
                        @click="$emit('heart-button-click', state)"
                    >
                        <fa icon="heart" />
                    </dn-icon-button>
                    <span class="text-center" :class="smallFontStyles">
                        {{ state.like.count }}
                    </span>
                </div>

                <div class="flex items-center">
                    <dn-icon-button
                        v-if="state.favor.enabled"
                        class="ml-2"
                        icon-color="black"
                        icon-selected-color="yellow"
                        :selected="state.favor.active"
                        :disabled="state.favor.loading"
                        @click="$emit('star-button-click', state)"
                    >
                        <fa icon="star" />
                    </dn-icon-button>
                    <span class="text-center" :class="smallFontStyles">
                        {{ state.favor.count }}
                    </span>
                </div>
            </div>
            <div class="flex justify-between">
                <dn-icon-button
                    v-if="state.sensitive.enabled"
                    class="ml-2"
                    icon-color="black"
                    icon-selected-color="red"
                    :selected="state.sensitive.active"
                    :disabled="state.sensitive.loading"
                    @click="$emit('sensitive-button-click', state)"
                >
                    <fa icon="eye-slash" />
                </dn-icon-button>
                <dn-icon-button
                    v-if="state.reply.enabled"
                    class="ml-2"
                    icon-color="black"
                    :disabled="state.reply.loading"
                    @click="$emit('reply-button-click')"
                >
                    <fa icon="comment" />
                </dn-icon-button>
            </div>
        </div>
    </div>
</template>

<script>
//-- Libraries
import _ from 'lodash'
import { computed, toRef } from 'vue'

//-- Components
import DnIconButton from '@ca/icon-button.vue'
import DnEditor from '@ca/editor.vue'

//-- Composables
import { useTimeAgo } from '@vueuse/core'
import useInteractionState from '@/composables/use-interaction-state'

//-- Assets
import userDefault from '@/assets/user_default.png'

const { buildInteractionState } = useInteractionState()

console.log('date', '2022-06-17T21:30:09.000000Z')

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
        'sensitive-button-click',
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
        user: {
            type: Object,
            default: () => {
                return {
                    avatar: userDefault,
                }
            },
        },
        date: {
            type: String,
            default: '2022-06-17T21:30:09.000000Z',
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
                    sensitive: false,
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
            'flex flex-col',
            'w-full min-w-[80%]',
            'font-display select-none',
            'border border-black/20 rounded',
            'shadow-md',
        ]

        const BASE_BG = [props.dim && 'bg-black/25']

        const computedStyles = computed(() => {
            return [BASE_STYLES, BASE_BG, props.rounded && 'rounded-xl']
        })

        const smallFontStyles = ['min-w-[36px]', 'text-xs', 'text-gray-500']

        const user = toRef(props, 'user')
        const computedUserData = computed(() => {
            return {
                ...user,
                avatar: user.avatar ?? userDefault,
            }
        })

        const timeAgo = useTimeAgo(props.date)

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
            smallFontStyles,
            computedUserData,
            timeAgo,
            hasContent,
            deltaContent,
        }
    },
}
</script>
