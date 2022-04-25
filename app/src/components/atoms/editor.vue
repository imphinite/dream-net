<template>
    <div :class="computedStyles">
        <quill-editor
            ref="quill"
            v-model:content="contentDelta"
            :theme="computedTheme"
            :read-only="readOnly"
            @focus="focus = true"
            @blur="focus = false"
        />
    </div>
</template>

<script>
//-- Libraries
import _ from 'lodash'
import { ref, toRef, watch, computed } from 'vue'
import { QuillEditor, Delta } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

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
        theme: {
            type: String,
            default: 'snow',
        },
        dim: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue', 'focus', 'blur'],
    setup(props, { emit }) {
        const quill = ref()

        //-- Styles
        const focus = ref(false)
        watch(focus, (newFocusValue) => {
            emit(newFocusValue ? 'focus' : 'blur')
        })

        const BASE_STYLES = ['rounded', 'text-white', 'transition']
        const BASE_BG = [props.dim ? 'bg-black/25' : 'bg-transparent']

        const computedFocusRingStyles = computed(() => {
            const showRing = !props.readOnly && focus.value

            const ringStyles = [
                'ring-2',
                props.dim ? 'ring-white/75' : 'ring-[#2563eb]',
            ]

            return showRing ? ringStyles : 'ring-none'
        })

        const computedStyles = computed(() => {
            return [BASE_STYLES, BASE_BG, computedFocusRingStyles.value]
        })

        //-- Theme
        const themeRef = toRef(props, 'theme')
        const computedTheme = computed(() => {
            return props.readOnly ? 'bubble' : themeRef.value
        })

        //-- Content handling
        const content = toRef(props, 'modelValue') // modelValue

        const contentDelta = ref({})
        contentDelta.value = new Delta(content.value)

        watch(content, (newContent) => {
            if (props.readOnly) {
                quill.value.setContents(new Delta(newContent))
            } else {
                contentDelta.value = new Delta(newContent)
            }
        })

        // Every time content Delta changes, get JSON and update modelValue
        watch(contentDelta, (newContentDelta) => {
            // Get JSON
            const stringifiedJson = JSON.stringify(newContentDelta)

            // Update modelValue
            const newContent = JSON.parse(stringifiedJson)

            if (!_.isEqual(content.value, newContent)) {
                emit('update:modelValue', newContent)
            }
        })

        return {
            quill,
            computedStyles,
            computedTheme,
            contentDelta,
            focus,
        }
    },
}
</script>
