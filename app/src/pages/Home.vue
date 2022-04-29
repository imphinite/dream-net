<template>
    <dn-page
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @reload="$router.go()"
    >
        <dn-card
            v-for="(post, index) in homeFeed.posts"
            :key="index"
            class="snap-start mt-2"
            :loading="loadingTracker[post.id]"
            :title="post.title"
            :content="getContent(post.body)"
            :interactions="{
                like: true,
                favor: true,
                dislike: false,
                reply: true,
            }"
            v-bind="getUserInteractionsForPost(post)"
            @title-click="goToPost(post)"
            @reply-button-click="makingCommentsToPost(post)"
            @heart-button-click="togglePostLike(post)"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { reactive } from 'vue'
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
        const { posts: postModule, likes: likeModule } = useStore()
        const { homeFeed, fetchHomeFeedPosts } = postModule
        const { savePostLike, deletePostLike, hasLikedPost } = likeModule

        // Fetch posts from API
        if (
            !Boolean(homeFeed.value?.posts) ||
            homeFeed.value?.posts.length == 0
        ) {
            fetchHomeFeedPosts()
        }

        // Loading tracker
        const loadingTracker = reactive({})

        return {
            navDrawer,
            router,
            homeFeed,
            savePostLike,
            deletePostLike,
            hasLikedPost,
            loadingTracker,
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
        async togglePostLike(post) {
            const postId = post.id

            this.loadingTracker[postId] = true

            try {
                if (!this.hasLikedPost({ postId })) {
                    await this.savePostLike({ postId })
                    return
                }

                await this.deletePostLike({ postId })
            } finally {
                this.loadingTracker[postId] = false
            }
        },
        getUserInteractionsForPost(post) {
            return {
                liked: this.hasLikedPost({ postId: post.id }),
                favored: true,
                disliked: true,
            }
        },
    },
}
</script>
