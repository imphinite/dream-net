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
    },
    setup(props) {
        const BASE_STYLES = [
            'flex flex-col border-2 rounded-xl p-2 w-full min-w-[80%]',
            'font-display text-white',
        ]

        const BASE_BG = [
            'bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900',
            'hover:bg-gradient-to-tr hover:from-indigo-800 hover:via-purple-800 hover:to-pink-800',
        ]

        const computedStyles = computed(() => {
            return [BASE_STYLES, BASE_BG]
        })

        return {
            computedStyles,
        }
    },
}
</script>
