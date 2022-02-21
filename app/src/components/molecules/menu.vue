<template>
    <div :class="computedStyles">
        <dn-menu-item
            v-for="(item, index) in items"
            :icon="item.icon"
            :label="item.label"
            :active="item.active"
            @click="selectItem(index)"
        ></dn-menu-item>
    </div>
</template>

<script>
import _ from 'lodash'
import { ref, toRef, computed, watch } from 'vue'
import DnMenuItem from '@ca/menu-item.vue'

export default {
    name: 'dn-menu',
    components: {
        DnMenuItem,
    },
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: Object,
            default: null,
        },
        items: {
            type: Object,
            default: () => [],
        },
    },
    setup(props, { emit }) {
        // Styles
        const BASE_STYLES = [
            'flex flex-col w-full h-full',
            'font-display text-white',
        ]
        const BASE_BG = ['bg-transparent']

        const computedStyles = computed(() => {
            return [BASE_STYLES, BASE_BG]
        })

        // Select item
        const selectedItemIndex = ref()

        if (props.modelValue) {
            const modelValueItemIndex = props.items.findIndex((item) =>
                _.isEqual(item, props.modelValue)
            )
            selectedItemIndex.value = modelValueItemIndex
            console.log('')
        }

        const selectedItem = computed(() => {
            return props.items.find(
                (item, index) => index === selectedItemIndex.value
            )
        })
        const selectItem = (itemIndex) => {
            selectedItemIndex.value = itemIndex
        }

        watch(selectedItem, (item) => {
            console.log('selected', item)
            emit('update:modelValue', item)
        })

        return {
            computedStyles,
            selectItem,
        }
    },
}
</script>
