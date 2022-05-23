<template>
    <dn-page
        ref="page"
        :interactions="{
            back: true,
            menu: false,
            plus: true,
        }"
        swipable
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @swipe-end="goToHomePage"
        @load-more="loadMoreComments"
    >
        <!-- Post -->
        <dn-card
            class="snap-start mt-2"
            :title="activePost.title"
            :content="activePost.body"
            :state="postState"
            @reply-button-click="showComposer = !showComposer"
            @heart-button-click="togglePostLike(activePost)"
            @star-button-click="togglePostFavor(activePost)"
        />

        <dn-composer
            v-if="showComposer"
            ref="composer"
            v-model="formData"
            @cancel="showComposer = false"
            @submit="handleSubmit"
        />

        <!-- Comments -->
        <div v-if="loadingComments" class="w-full text-center text-white p-16">
            <fa class="fa-spin text-4xl" icon="spinner" />
        </div>
        <dn-card
            v-for="(comment, index) in activePostComments.comments"
            :key="index"
            class="snap-start mt-2"
            dim
            :content="comment.body"
            :state="commentState[comment.id]"
            @heart-button-click="toggleCommentLike(comment)"
            @star-button-click="toggleCommentFavor(comment)"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { ref, reactive, nextTick, watch, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'

//-- Components
import DnCard from '@cm/card.vue'
import DnPage from '@ct/page.vue'
import DnComposer from '@cm/composer.vue'

//-- Store
import useStore from '@/store/use-store'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useInteractionState from '@/composables/use-interaction-state'

export default {
    name: 'dn-post',
    components: { DnCard, DnPage, DnComposer },
    setup() {
        const { navDrawer } = useNavigationDrawer()
        const { buildInteractionState } = useInteractionState()

        // Handle data
        const {
            posts: postModule,
            comments: commentModule,
            likes: likeModule,
            favors: favorModule,
        } = useStore()
        const { activePost, setActivePost, fetchPost } = postModule
        const { fetchComments, activePostComments, saveComment } = commentModule
        const { hasLikedPost, hasLikedComment, updatePostLike } = likeModule
        const { hasFavoredPost, hasFavoredComment, updatePostFavor } =
            favorModule

        // Get active post id from route
        const route = useRoute()
        const postId = route.params.id

        // Fetch post from API
        setActivePost({ postId })
        fetchPost({ postId })

        const loadingComments = ref(false)
        if (
            !activePostComments.value?.comments ||
            activePostComments.value?.comments.length == 0
        ) {
            loadingComments.value = true
            fetchComments({ postId: activePost.value.id }).then(() => {
                loadingComments.value = false
            })
        }

        // Composer
        const composer = ref()
        const showComposer = ref(false)
        showComposer.value = Boolean(route?.query?.composer)
        const formData = ref({
            content: {},
        })

        const focusComposer = () => {
            nextTick(() => {
                composer.value.$el.querySelector('.ql-editor').focus()
            })
        }
        onMounted(() => {
            if (showComposer.value) {
                focusComposer()
            }
        })
        watch(showComposer, (newShowComposer) => {
            if (newShowComposer) {
                focusComposer()
            }
        })

        // Interaction state of post
        const state = buildInteractionState({
            like: true,
            favor: true,
            dislike: false,
            reply: true,
        })
        const postState = reactive(state)
        updatePostLike({
            postId: activePost.value.id,
            like: activePost.value.liked,
        })
        updatePostFavor({
            postId: activePost.value.id,
            favor: activePost.value.favored,
        })
        watchEffect(() => {
            postState.like.active = hasLikedPost({
                postId: activePost.value.id,
            })
            postState.favor.active = hasFavoredPost({
                postId: activePost.value.id,
            })
            postState.dislike.active = true
        })

        // Interaction state of each comment item
        const commentState = reactive({})
        watchEffect(() => {
            if (activePostComments.value.comments) {
                activePostComments.value.comments.forEach((comments) => {
                    const commentId = comments.id

                    // Initialize
                    if (!(commentId in commentState)) {
                        const state = buildInteractionState({
                            like: true,
                            favor: true,
                            dislike: true,
                            reply: false,
                        })

                        commentState[commentId] = reactive(state)
                    }

                    // Updates
                    commentState[commentId].like.active = hasLikedComment({
                        commentId,
                    })
                    commentState[commentId].favor.active = hasFavoredComment({
                        commentId,
                    })
                })
            }
        })

        // Load more
        const loadingMore = ref(false)

        return {
            navDrawer,
            composer,
            showComposer,
            formData,
            activePost,
            activePostComments,
            postId,
            saveComment,
            ...likeModule,
            ...favorModule,
            postState,
            commentState,
            loadingComments,
            fetchComments,
            loadingMore,
        }
    },

    methods: {
        goToHomePage() {
            this.$router.push({ name: 'Home' })
        },
        async handleSubmit(event) {
            const { content } = event
            await this.saveComment({
                postId: this.postId,
                body: JSON.stringify(content),
            })

            this.showComposer = false
        },
        async togglePostLike(post) {
            const postId = post.id
            this.postState.like.loading = true

            try {
                if (!this.hasLikedPost({ postId })) {
                    await this.savePostLike({ postId })
                    return
                }

                await this.deletePostLike({ postId })
            } finally {
                this.postState.like.loading = false
            }
        },
        async togglePostFavor(post) {
            const postId = post.id
            this.postState.favor.loading = true

            try {
                if (!this.hasFavoredPost({ postId })) {
                    await this.savePostFavor({ postId })
                    return
                }

                await this.deletePostFavor({ postId })
            } finally {
                this.postState.favor.loading = false
            }
        },
        async toggleCommentLike(comment) {
            const commentId = comment.id
            this.commentState[commentId].like.loading = true

            try {
                if (!this.hasLikedComment({ commentId })) {
                    await this.saveCommentLike({ commentId })
                    return
                }

                await this.deleteCommentLike({ commentId })
            } finally {
                this.commentState[commentId].like.loading = false
            }
        },
        async toggleCommentFavor(comment) {
            const commentId = comment.id
            this.commentState[commentId].favor.loading = true

            try {
                if (!this.hasFavoredComment({ commentId })) {
                    await this.saveCommentFavor({ commentId })
                    return
                }

                await this.deleteCommentFavor({ commentId })
            } finally {
                this.commentState[commentId].favor.loading = false
            }
        },
        async loadMoreComments() {
            if (!this.activePostComments?.meta?.cursor?.next) {
                return
            }

            this.loadingMore = true

            try {
                await this.fetchComments({
                    postId: this.activePost.id,
                    cursor: this.activePostComments.meta.cursor.next,
                })
            } finally {
                this.loadingMore = false
            }
        },
    },
}
</script>
