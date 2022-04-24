<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        <dn-composer
            v-model="formData"
            title
            @cancel="goBack"
            @submit="handleSubmit"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { ref } from 'vue'

//-- Components
import DnPage from '@ct/page.vue'
import DnComposer from '@cm/composer.vue'

//-- Composables
import useNavigationDrawer from '@/composables/use-navigation-drawer'
import useStore from '@/store/use-store'

export default {
    name: 'dn-compose',
    components: { DnPage, DnComposer },
    setup() {
        const formData = ref({
            title: '',
            content: {},
        })

        //-- Store
        const { posts: postModule } = useStore()
        const { savePost } = postModule

        return {
            ...useNavigationDrawer(),
            formData,
            savePost,
        }
    },
    methods: {
        goBack() {
            if (this.$router) {
                this.$router.go(-1)
            }
        },
        async handleSubmit(event) {
            console.log('handleSubmit', event)

            const { title, content } = event
            const newPost = await this.savePost({
                title,
                body: JSON.stringify(content),
            })

            if (this.$router) {
                this.$router.push(`/posts/${newPost.id}`)
            }
        },
    },
}
</script>
