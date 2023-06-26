<template>
    <dn-page
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @reload="$router.go()"
        @load-more="loadMorePosts"
    >
        <div class="p-4 w-full">
            <dn-image-button
                class="h-48 w-full mb-4"
                @click="router.push(`/compose`)"
            >
                I just had a dream!
            </dn-image-button>
            <dn-image-button
                class="h-48 w-full mb-4"
                @click="router.push(`/feed`)"
            >
                What are other people dreaming of?
            </dn-image-button>
            <dn-image-button
                class="h-48 w-full mb-16"
                @click="router.push(`/favorites`)"
            >
                Favorite dreams
            </dn-image-button>
        </div>
    </dn-page>
</template>

<script>
//-- Libraries
import { useRouter } from 'vue-router'

//-- Components
import DnCard from '@cm/card.vue'
import DnImageButton from '@ca/image-button.vue'
import DnHeader from '@cm/header.vue'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import DnPage from '@ct/page.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'

//-- Assets
import icon from '@/assets/icon.png'

export default {
    name: 'dn-home',
    components: {
        DnCard,
        DnHeader,
        DnImageButton,
        DnNavigationDrawer,
        DnPage,
    },
    setup() {
        const { navDrawer } = useNavigationDrawer()

        // Handle routing
        const router = useRouter()

        return {
            navDrawer,
            router,
            icon,
        }
    },
    methods: {
        goToFeed() {
            this.router.push(`/feed`)
        },
    },
}
</script>
