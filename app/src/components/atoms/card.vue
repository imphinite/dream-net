<template>
    <div :class="computedStyles">
        <div class="card-title font-bold uppercase text-2xl">title</div>
        <div class="card-body text-sm line-clamp-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut.
        </div>
        <div class="card-footer flex justify-between pt-2">
            <div>
                <fa icon="coffee" />
                <dn-button></dn-button>
                <dn-button>Like</dn-button>
            </div>
            <dn-button>Comment</dn-button>
        </div>
    </div>
</template>

<script>
import { toRef, computed } from 'vue'
import DnButton from '@ca/button.vue'

export default {
    name: 'dn-card',
    components: {
        DnButton,
    },
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
            // 'transition-[height] h-[300px] hover:h-[500px]',
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
    methods: {
        onClick() {
            /**
             * Click event
             *
             * @event click
             */
            this.$emit('click')
        },
    },
}
</script>
