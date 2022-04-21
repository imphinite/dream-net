<template>
    <article :class="containerStyles">
        <dn-header @menu-button-click="navDrawer = !navDrawer" />

        <section class="scrollbar-hidden" :class="bodySectionStyles">
            <slot>
                <dn-card
                    v-for="(post, index) in homeFeed.posts"
                    :key="index"
                    class="snap-start mt-2"
                    :title="post.title"
                    :content="getContentFromPostBody(post.body)"
                />
            </slot>
        </section>
    </article>
</template>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
    width: 0 !important;
}
.scrollbar-hidden {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
</style>

<script>
//-- Libraries
import { computed } from 'vue'

//-- Components
import DnHeader from '@cm/header.vue'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import DnCard from '@cm/card.vue'

//-- Store
import useStore from '@/store/use-store'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useGradients from '@/composables/use-gradients'

export default {
    name: 'dn-home',
    components: { DnHeader, DnNavigationDrawer, DnCard },
    data() {
        return {
            showNavigationDrawer: false,
        }
    },
    setup() {
        const CONTAINER_STYLES = [
            'relative',
            'flex flex-col',
            'w-screen h-screen overflow-hidden',
        ]

        const { GRADIENTS } = useGradients({ hover: false })
        const BG_STYLES = [
            'bg-gradient-to-tr',
            GRADIENTS.CAN_YOU_FEEL_THE_LOVE_TONIGHT,
        ]

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES, BG_STYLES]
        })

        const BODY_SECTION_STYLES = [
            'absolute',
            'w-full h-screen pt-12',
            'snap-y overflow-y-scroll scroll-smooth box-content scroll-py-14',
            'bg-black/25',
        ]

        const bodySectionStyles = computed(() => {
            return [BODY_SECTION_STYLES]
        })

        const { navDrawer } = useNavigationDrawer()

        // Handle data
        const { posts: postModule } = useStore()
        const { homeFeed, fetchHomeFeedPosts, clearPostStorage } = postModule

        // clearPostStorage()
        fetchHomeFeedPosts()

        console.log('homeFeed', homeFeed)

        return {
            navDrawer,
            containerStyles,
            bodySectionStyles,
            homeFeed,
        }
    },

    mounted() {
        console.log('mounted', this.homeFeed)
    },

    methods: {
        getContentFromPostBody(postBody) {
            return {
                ops: [{ insert: postBody }],
            }
        },
    },
}
</script>
