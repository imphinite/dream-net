<template>
    <button :class="containerStyles">
        <div
            class="flex place-self-center items-center h-8 w-8 justify-center rounded-full overflow-hidden border-white border-2 shrink-0 m-2"
        >
            <img
                class="object-cover h-8 w-8"
                :src="userDefault"
                :alt="userDefault"
            />
        </div>
        <div :class="textStyles">{{ text }}</div>
    </button>
</template>

<script>
//-- External libraries
import { computed } from 'vue'

//-- Assets
import userDefault from '@/assets/user_default.png'

export default {
    name: 'dn-list-item',
    props: {
        text: {
            type: String,
            default: "You've been notified.",
        },
    },
    setup() {
        const BASE_STYLES = [
            'flex items-center',
            'w-full',
            'font-display select-none',
            'border-y border-black/20',
            'shadow-sm',
        ]

        const HOVER_STYLES = ['hover:bg-black/10', 'transition']

        const containerStyles = computed(() => {
            return [BASE_STYLES, HOVER_STYLES]
        })

        const dividerStyles = computed(() => {
            return ['border-b-2', 'grow', 'mx-2']
        })

        const textStyles = computed(() => {
            return ['text-black/75 text-sm', 'line-clamp-1']
        })

        return {
            containerStyles,
            dividerStyles,
            textStyles,
            userDefault,
        }
    },
}
</script>
