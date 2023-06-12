<template>
    <form action="" method="post" :class="formStyles">
        <!-- Title -->
        <div v-if="!compact" class="mb-4">
            <dn-text-input
                v-model="formData.title"
                dim
                placeholder="Your post's title here"
                :disabled="disabled"
            >
                <template v-slot:error>
                    <span
                        v-if="titleError"
                        class="text-red-400 text-shadow text-sm px-2"
                    >
                        {{
                            titleError.message ||
                            'Oops, an unknown error occurred'
                        }}
                    </span>
                </template>
            </dn-text-input>
        </div>

        <!-- Editor -->
        <div class="mb-2">
            <dn-editor
                v-model="formData.content"
                theme="bubble"
                :read-only="disabled"
                :dim="true"
            />

            <span
                v-if="contentError"
                class="text-red-400 text-shadow text-sm px-2"
            >
                {{ contentError.message || 'Oops, an unknown error occurred' }}
            </span>
        </div>

        <div class="mt-8 px-1"><dn-checkbox label="Publish anonymously" /></div>

        <!-- Button group -->
        <div v-if="compact" class="flex items-center justify-between mt-2">
            <dn-icon-button
                icon="arrow-left"
                icon-color="black"
                @click="$emit('cancel')"
                :disabled="disabled"
            />
            <dn-icon-button
                icon="paper-plane"
                icon-color="black"
                @click="$emit('submit', formData)"
                :disabled="disabled"
            />
        </div>
        <div v-else class="my-4">
            <dn-button
                preset="secondary"
                class="w-full"
                @click="$emit('submit', formData)"
            >
                PUBLISH
            </dn-button>
            <dn-button
                preset="secondary"
                class="w-full mt-4"
                @click="$emit('save', formData)"
            >
                SAVE
            </dn-button>
        </div>
    </form>
</template>

<script>
//-- Libraries
import { toRef, computed, watch } from 'vue'

//-- Components
import DnButton from '@ca/button.vue'
import DnCheckbox from '@ca/checkbox.vue'
import DnEditor from '@ca/editor.vue'
import DnIconButton from '@ca/icon-button.vue'
import DnTextInput from '@ca/text-input'

export default {
    name: 'dn-composer',
    components: {
        DnButton,
        DnCheckbox,
        DnEditor,
        DnIconButton,
        DnTextInput,
    },
    emits: ['cancel', 'submit', 'save', 'update:modelValue'],
    props: {
        modelValue: {
            type: Object,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Object,
            default: () => {
                return {}
            },
        },
        compact: {
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

        const titleError = computed(() => {
            if (!('title' in props.error)) {
                return false
            }
            return props.error.title
        })
        const contentError = computed(() => {
            if (!('content' in props.error)) {
                return false
            }
            return props.error.content
        })

        return {
            formStyles,
            formData,
            titleError,
            contentError,
        }
    },
}
</script>
