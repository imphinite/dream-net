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
            v-bind="getUserInteractionsForPost(activePost)"
            @reply-button-click="showComposer = !showComposer"
            @heart-button-click="togglePostLike(activePost)"
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
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { ref, reactive, nextTick, watch, onMounted } from 'vue'
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
        } = useStore()
        const { activePost, setActivePost } = postModule
        const { fetchComments, activePostComments, saveComment } = commentModule
        const { updatePostLike } = likeModule

        // Get active post id from route
        const route = useRoute()
        const postId = route.params.id

        // Fetch posts from API
        setActivePost({ postId })
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

        // Likes
        // Sync activePost-like relationship in case post data is read from localStorage
        updatePostLike({
            postId: activePost.value.id,
            like: activePost.value.liked,
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
            activePostComments,
            postId,
            saveComment,
            ...likeModule,
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
        getUserInteractionsForPost(post) {
            return {
                liked: this.hasLikedPost({ postId: post.id }),
                favored: true,
                disliked: true,
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
        getUserInteractionsForComment(comment) {
            return {
                liked: this.hasLikedComment({ commentId: comment.id }),
                favored: true,
                disliked: true,
            }
        },
    },
}
</script>
