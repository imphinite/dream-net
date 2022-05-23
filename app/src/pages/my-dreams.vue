<template>
    <dn-page
        title="My Dreams"
        swipable
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @reload="$router.go()"
        @load-more="loadMorePosts"
    >
        <dn-card
            v-for="(post, index) in myFeed.posts"
            :key="index"
            class="snap-start mt-2"
            :title="post.title"
            :content="post.body"
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
import { ref, reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

//-- Components
import DnPage from '@ct/page.vue'
import DnCard from '@cm/card.vue'

//-- Store
import useStore from '@/store/use-store'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useInteractionState from '@/composables/use-interaction-state'

export default {
    name: 'dn-my-dreams',
    components: { DnPage, DnCard },
    setup() {
        // const { navDrawer } = useNavigationDrawer()
        const { buildInteractionState } = useInteractionState()

        // Handle routing
        const router = useRouter()

        // Handle data
        const {
            posts: postModule,
            likes: likeModule,
            favors: favorModule,
        } = useStore()
        const { myFeed, fetchMyFeedPosts } = postModule
        const { hasLikedPost } = likeModule
        const { hasFavoredPost } = favorModule

        // Fetch posts from API
        if (!myFeed.value?.posts || myFeed.value?.posts.length <= 1) {
            fetchMyFeedPosts()
        }

        // State of each post item
        const postState = reactive({})
        watchEffect(() => {
            myFeed.value.posts.forEach((post) => {
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

        // Load more
        const loadingMore = ref(false)

        return {
            ...useNavigationDrawer(),
            router,
            myFeed,
            ...likeModule,
            ...favorModule,
            postState,
            fetchMyFeedPosts,
            loadingMore,
        }
    },
    methods: {
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
        async loadMorePosts() {
            this.loadingMore = true

            try {
                await this.fetchMyFeedPosts({
                    cursor: this.myFeed.meta.cursor.next,
                    globalLoading: false,
                })
            } finally {
                this.loadingMore = false
            }
        },
    },
}
</script>
