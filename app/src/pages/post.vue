<template>
    <dn-page
        ref="page"
        :interactions="{
            back: true,
            menu: false,
            plus: true,
        }"
        @toggle-navigation-drawer="navDrawer = !navDrawer"
        @swipe-end="goToHomePage"
    >
        <!-- Post -->
        <dn-card
            class="snap-start mt-2"
            :loading="postLoading"
            :title="activePost.title"
            :content="getContent(activePost.body)"
            :interactions="{
                like: true,
                favor: true,
                dislike: false,
                reply: true,
            }"
            :liked="meLiked"
            :favored="meFavored"
            :disliked="meDisliked"
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
        <dn-card
            v-for="(comment, index) in activePostComments.comments"
            :key="index"
            class="snap-start mt-2"
            dim
            :loading="commentsloadingTracker[comment.id]"
            :content="getContent(comment.body)"
            :interactions="{
                like: true,
                favor: true,
                dislike: true,
                reply: false,
            }"
            v-bind="getUserInteractionsForComment(comment)"
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

export default {
    name: 'dn-post',
    components: { DnCard, DnPage, DnComposer },
    setup() {
        const { navDrawer } = useNavigationDrawer()

        // Handle data
        const {
            posts: postModule,
            comments: commentModule,
            likes: likeModule,
            favors: favorModule,
        } = useStore()
        const { activePost, setActivePost, fetchPost } = postModule
        const { fetchComments, activePostComments, saveComment } = commentModule
        const { hasLikedPost } = likeModule
        const { hasFavoredPost } = favorModule

        // Get active post id from route
        const route = useRoute()
        const postId = route.params.id

        // Fetch post from API
        setActivePost({ postId })
        fetchPost({ postId })

        if (
            !Boolean(activePostComments.value?.comments) ||
            activePostComments.value?.comments.length == 0
        ) {
            fetchComments({ postId: activePost.value.id })
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

        // Initialize saved user's interactions
        const meLiked = ref(false)
        const meFavored = ref(false)
        const meDisliked = ref(false)

        likeModule.updatePostLike({
            postId: activePost.value.id,
            like: activePost.value.liked,
        })
        favorModule.updatePostFavor({
            postId: activePost.value.id,
            favor: activePost.value.favored,
        })

        watchEffect(() => {
            meLiked.value = hasLikedPost({
                postId: activePost.value.id,
            })
            meFavored.value = hasFavoredPost({
                postId: activePost.value.id,
            })
            meDisliked.value = true
        })

        // Loading trackers
        const postLoading = ref(false)
        const commentsloadingTracker = reactive({})

        return {
            navDrawer,
            composer,
            showComposer,
            formData,
            activePost,
            meLiked,
            meFavored,
            meDisliked,
            activePostComments,
            postId,
            saveComment,
            ...likeModule,
            ...favorModule,
            postLoading,
            commentsloadingTracker,
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

            this.postLoading = true

            try {
                if (!this.hasLikedPost({ postId })) {
                    await this.savePostLike({ postId })
                    return
                }

                await this.deletePostLike({ postId })
            } finally {
                this.postLoading = false
            }
        },
        async togglePostFavor(post) {
            const postId = post.id

            this.postLoading = true

            try {
                if (!this.hasFavoredPost({ postId })) {
                    await this.savePostFavor({ postId })
                    return
                }

                await this.deletePostFavor({ postId })
            } finally {
                this.postLoading = false
            }
        },
        async toggleCommentLike(comment) {
            const commentId = comment.id

            this.commentsloadingTracker[commentId] = true

            try {
                if (!this.hasLikedComment({ commentId })) {
                    await this.saveCommentLike({ commentId })
                    return
                }

                await this.deleteCommentLike({ commentId })
            } finally {
                this.commentsloadingTracker[commentId] = false
            }
        },
        async toggleCommentFavor(comment) {
            const commentId = comment.id

            this.commentsloadingTracker[commentId] = true

            try {
                if (!this.hasFavoredComment({ commentId })) {
                    await this.saveCommentFavor({ commentId })
                    return
                }

                await this.deleteCommentFavor({ commentId })
            } finally {
                this.commentsloadingTracker[commentId] = false
            }
        },
        getUserInteractionsForComment(comment) {
            return {
                liked: this.hasLikedComment({ commentId: comment.id }),
                favored: this.hasFavoredComment({ commentId: comment.id }),
                disliked: true,
            }
        },
    },
}
</script>
