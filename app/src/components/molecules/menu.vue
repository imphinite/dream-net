<template>
    <div :class="computedStyles">
        <dn-menu-item
            v-for="(item, index) in items"
            :key="index"
            :icon="item.icon"
            :label="item.label"
            :background="item.background"
            :active="isItemActive(index)"
            @click="selectItem(index)"
        ></dn-menu-item>
    </div>
</template>

<script>
import _ from 'lodash'
import { ref, computed, watch } from 'vue'
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
            type: Array,
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
            return [BASE_STYLES, BASE_BG, 'space-y-2']
        })

        // Select item
        const modelValueItemIndex = props.items.findIndex((item) =>
            _.isEqual(item, props.modelValue)
        )
        const selectedItemIndex = ref(modelValueItemIndex)
        const selectedItem = computed(() => {
            return props.items.find(
                (item, index) => index === selectedItemIndex.value
            )
        })
        const selectItem = (itemIndex) => {
            selectedItemIndex.value = itemIndex
            emit('select', selectedItem.value)
        }
        const isItemActive = (itemIndex) => {
            return itemIndex === selectedItemIndex.value
        }
        watch(selectedItem, (item) => {
            emit('update:modelValue', item)
        })

        return {
            computedStyles,
            selectItem,
            selectedItemIndex,
            isItemActive,
        }
    },
}
</script>
