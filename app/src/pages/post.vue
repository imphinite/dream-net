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
            :interactions="{
                like: true,
                favor: true,
                dislike: false,
                reply: true,
            }"
            @reply-button-click="showComposer = !showComposer"
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
            :content="getContent(comment.body)"
            :interactions="{
                like: true,
                favor: true,
                dislike: true,
                reply: false,
            }"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { ref, nextTick, watch, onMounted } from 'vue'
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
        const { posts: postModule, comments: commentModule } = useStore()
        const { activePost, setActivePost } = postModule
        const { fetchComments, activePostComments } = commentModule

        // Get active post id from route
        const route = useRoute()
        const postId = route.params.id

        // Composer
        const composer = ref()
        const showComposer = ref(false)
        showComposer.value = Boolean(route?.query?.composer)
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

        const formData = ref({
            content: {},
        })

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
            composer,
            showComposer,
            formData,
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
        async handleSubmit(event) {
            console.log('handleSubmit', event)

            const { content } = event
            // const newPost = await this.saveComment({
            //     title,
            //     body: JSON.stringify(content),
            // })

            // if (this.$router) {
            //     this.$router.push(`/posts/${newPost.id}`)
            // }
        },
    },
}
</script>
