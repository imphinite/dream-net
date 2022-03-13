<template>
    <quill-editor
        :theme="theme"
        v-model:content="content"
        :read-only="readOnly"
    />
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { ref, watch, computed } from 'vue'

export default {
    name: 'dn-editor',
    components: {
        QuillEditor,
    },
    props: {
        modelValue: {
            type: Object,
            default: () => {},
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            content: {},
        }
    },
    setup(props, { emit }) {
        const content = ref({})
        content.value = props.modelValue

        watch(content, (newContent) => {
            emit('update:modelValue', newContent)
        })

        const theme = computed(() => {
            return props.readOnly ? 'bubble' : 'snow'
        })

        return {
            content,
            theme,
        }
    },
}
</script>
