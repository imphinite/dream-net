<template>
    <div :class="dividerContainerStyles">
        <div :class="dividerStyles" />
        <div :class="textStyles">OR</div>
        <div :class="dividerStyles" />
    </div>
</template>

<script>
//-- External libraries
import { computed } from 'vue'

export default {
    name: 'dn-divider',
    setup() {
        const dividerContainerStyles = computed(() => {
            return ['flex items-center']
        })

        const dividerStyles = computed(() => {
            return ['border-b-2', 'grow', 'mx-2']
        })

        const textStyles = computed(() => {
            return ['text-black/50 text-sm font-semibold']
        })

        return {
            dividerContainerStyles,
            dividerStyles,
            textStyles,
        }
    },
}
</script>
