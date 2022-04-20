<template>
    <editor v-model="modelValue" theme="bubble" />
</template>

<script>
import Editor from '@ca/editor'

export default {
    name: 'dn-comment-reply-form',
    components: {
        Editor,
    },
    props: {},
    setup() {},
}
</script>
