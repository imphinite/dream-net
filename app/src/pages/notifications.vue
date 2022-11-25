<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        <dn-list-item
            v-for="(index, item) in mockItems"
            :key="item.id"
            class="mt-2"
            :text="item.text"
        />
    </dn-page>
</template>

<script>
//-- External Libraries
import { ref } from 'vue'

//-- Components
import DnListItem from '@ca/list-item.vue'
import DnPage from '@ct/page.vue'

//-- Composables

export default {
    name: 'dn-notifications',
    components: {
        DnListItem,
        DnPage,
    },
    setup() {
        const mockItems = ref([
            {
                id: 1,
                text: 'Jack just liked your dream!',
            },
            {
                id: 2,
                text: 'Maria just liked your dream!',
            },
            {
                id: 3,
                text: 'Jon commented, "I had a similar dream last week."',
            },
        ])

        return { mockItems }
    },
}
</script>
