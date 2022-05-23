<template>
    <dn-page @toggle-navigation-drawer="navDrawer = !navDrawer">
        <dn-composer
            v-model="formData"
            title
            :error="error"
            @cancel="goBack"
            @submit="handleSubmit"
        />
    </dn-page>
</template>

<script>
//-- Libraries
import { ref, computed } from 'vue'

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

        const error = ref({})
        const hasFormError = computed(() => {
            if (!_.isEmpty(error.value)) {
                return true
            }
            return false
        })

        return {
            ...useNavigationDrawer(),
            formData,
            savePost,
            error,
            hasFormError,
        }
    },
    methods: {
        goBack() {
            if (this.$router) {
                this.$router.go(-1)
            }
        },
        validateForm(input) {
            const { title, content } = input
            this.error = {}

            if (!title) {
                _.set(this.error, 'title.message', 'Must provide a title')
            }

            if (_.isEmpty(content)) {
                _.set(this.error, 'content.message', 'Content is too short')
            }
        },
        async handleSubmit(event) {
            const { title, content } = event

            this.validateForm(event)
            if (this.hasFormError) {
                return
            }

            await this.savePost({
                title,
                body: JSON.stringify(content),
            })

            if (this.$router) {
                this.$router.push({ name: 'My Dreams' })
            }
        },
    },
}
</script>
