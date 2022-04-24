<template>
    <dn-page
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @reload="$router.go()"
    >
        <dn-card
            v-for="(post, index) in homeFeed.posts"
            :key="index"
            class="snap-start mt-2"
            :title="post.title"
            :content="getContent(post.body)"
            :interactions="{
                like: true,
                favor: true,
                dislike: false,
                reply: true,
            }"
            @title-click="goToPost(post)"
            @reply-button-click="makingCommentsToPost(post)"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { useRouter } from 'vue-router'

//-- Components
import DnHeader from '@cm/header.vue'
import DnNavigationDrawer from '@co/navigation-drawer.vue'
import DnCard from '@cm/card.vue'
import DnPage from '@ct/page.vue'

//-- Store
import useStore from '@/store/use-store'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'

export default {
    name: 'dn-home',
    components: { DnHeader, DnNavigationDrawer, DnCard, DnPage },
    setup() {
        const { navDrawer } = useNavigationDrawer()

        // Handle routing
        const router = useRouter()

        // Handle data
        const { posts: postModule } = useStore()
        const { homeFeed, fetchHomeFeedPosts } = postModule

        // Fetch posts from API
        if (
            !Boolean(homeFeed.value?.posts) ||
            homeFeed.value?.posts.length == 0
        ) {
            fetchHomeFeedPosts()
        }

        return {
            navDrawer,
            router,
            homeFeed,
        }
    },
    methods: {
        getContent(body) {
            let content, delta
            try {
                delta = JSON.parse(body)
                content = delta
            } catch (err) {
                content = {
                    ops: [{ insert: body }],
                }
            }

            return content
        },
        goToPost(post) {
            this.router.push(`/posts/${post.id}`)
        },
        makingCommentsToPost(post) {
            this.router.push(`/posts/${post.id}?composer=true`)
        },
    },
}
</script>
