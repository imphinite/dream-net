<template>
    <form action="" method="post" :class="formStyles">
        <!-- Title -->
        <div v-if="title" class="mb-4">
            <dn-text-input
                v-model="formData.title"
                dim
                placeholder="Your post's title here"
                :disabled="disabled"
            />
        </div>

        <!-- Editor -->
        <div class="mb-2">
            <dn-editor
                v-model="formData.content"
                theme="bubble"
                :read-only="disabled"
                :dim="true"
            />
        </div>

        <!-- Button group -->
        <div class="flex items-center justify-between mt-2">
            <dn-icon-button
                icon="arrow-left"
                @click="$emit('cancel')"
                :disabled="disabled"
            />
            <dn-icon-button
                icon="paper-plane"
                @click="$emit('submit', formData)"
                :disabled="disabled"
            />
        </div>
    </form>
</template>

<script>
//-- Libraries
import _ from 'lodash'
import { toRef, computed, watch } from 'vue'

//-- Components
import DnIconButton from '@ca/icon-button.vue'
import DnEditor from '@ca/editor.vue'
import DnTextInput from '@ca/text-input'

export default {
    name: 'dn-composer',
    components: {
        DnIconButton,
        DnEditor,
        DnTextInput,
    },
    emits: ['cancel', 'submit', 'update:modelValue'],
    props: {
        modelValue: {
            type: Object,
        },
        title: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const formStyles = computed(() => {
            return ['flex flex-col', 'p-2', 'border-y border-white/25']
        })

        // v-model
        const formData = toRef(props, 'modelValue')
        watch(formData.value, (newFormData) => {
            emit('update:modelValue', newFormData)
        })

        return {
            formStyles,
            formData,
        }
    },
}
</script>