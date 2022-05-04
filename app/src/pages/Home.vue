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
            :state="postState[post.id]"
            @title-click="goToPost(post)"
            @heart-button-click="togglePostLike(post)"
            @star-button-click="togglePostFavor(post)"
            @reply-button-click="makingCommentsToPost(post)"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { reactive, watchEffect } from 'vue'
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
import useInteractionState from '@/composables/use-interaction-state'

export default {
    name: 'dn-home',
    components: { DnHeader, DnNavigationDrawer, DnCard, DnPage },
    setup() {
        const { navDrawer } = useNavigationDrawer()
        const { buildInteractionState } = useInteractionState()

        // Handle routing
        const router = useRouter()

        // Handle data
        const {
            posts: postModule,
            likes: likeModule,
            favors: favorModule,
        } = useStore()
        const { homeFeed, fetchHomeFeedPosts } = postModule
        const { hasLikedPost } = likeModule
        const { hasFavoredPost } = favorModule

        // Fetch posts from API
        if (
            !Boolean(homeFeed.value?.posts) ||
            homeFeed.value?.posts.length == 0
        ) {
            fetchHomeFeedPosts()
        }

        // State of each post item
        const postState = reactive({})
        watchEffect(() => {
            homeFeed.value.posts.forEach((post) => {
                const postId = post.id

                // Initialize
                if (!(postId in postState)) {
                    const state = buildInteractionState({
                        like: true,
                        favor: true,
                        dislike: false,
                        reply: true,
                    })

                    postState[postId] = reactive(state)
                }

                // Updates
                postState[postId].like.active = hasLikedPost({ postId })
                postState[postId].favor.active = hasFavoredPost({ postId })
            })
        })

        return {
            navDrawer,
            router,
            homeFeed,
            ...likeModule,
            ...favorModule,
            postState,
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
            this.postState[postId].like.loading = true

            try {
                if (!this.hasLikedPost({ postId })) {
                    await this.savePostLike({ postId })
                    return
                }

                await this.deletePostLike({ postId })
            } finally {
                this.postState[postId].like.loading = false
            }
        },
        async togglePostFavor(post) {
            const postId = post.id
            this.postState[postId].favor.loading = true

            try {
                if (!this.hasFavoredPost({ postId })) {
                    await this.savePostFavor({ postId })
                    return
                }

                await this.deletePostFavor({ postId })
            } finally {
                this.postState[postId].favor.loading = false
            }
        },
    },
}
</script>
