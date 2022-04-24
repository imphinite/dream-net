<template>
    <dn-page
        ref="page"
        swipable
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @swipe-end="goToHomePage"
    >
        <!-- Post -->
        <dn-card
            class="snap-start mt-2"
            :title="activePost.title"
            :content="getContent(activePost.body)"
        />

        <!-- Comments -->
        <dn-card
            v-for="(comment, index) in activePostComments.comments"
            :key="index"
            class="snap-start mt-2"
            dim
            :content="getContent(comment.body)"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { useRoute } from 'vue-router'

//-- Components
import DnCard from '@cm/card.vue'
import DnPage from '@ct/page.vue'

//-- Store
import useStore from '@/store/use-store'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'

export default {
    name: 'dn-post',
    components: { DnCard, DnPage },
    setup() {
        const { navDrawer } = useNavigationDrawer()

        // Handle data
        const { posts: postModule, comments: commentModule } = useStore()
        const { activePost, setActivePost } = postModule
        const { fetchComments, activePostComments } = commentModule

        // Get active post id from route
        const route = useRoute()
        const postId = route.params.id

        setActivePost({ postId })

        // Fetch posts from API
        if (
            !Boolean(activePostComments.value?.comments) ||
            activePostComments.value?.comments.length == 0
        ) {
            fetchComments({ postId: activePost.value.id })
        }

        return {
            navDrawer,
            activePost,
            activePostComments,
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
        goToHomePage() {
            this.$router.push({ name: 'Home' })
        },
    },
}
</script>
