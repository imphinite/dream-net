<template>
    <button
        type="button"
        class="border rounded-full"
        @click="onClick"
        :style="style"
    >
        {{ label }}
    </button>
</template>

<script>
import '@style/components/button.css'

export default {
    name: 'dn-button',

    props: {
        label: {
            type: String,
            required: true,
        },
        primary: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'medium',
            validator: function (value) {
                return ['small', 'medium', 'large'].indexOf(value) !== -1
            },
        },
        backgroundColor: {
            type: String,
        },
        tailwind: {
            type: String,
            default: '',
        },
    },

    computed: {
        classes() {
            return {
                'dn-button': true,
                // 'storybook-button--primary': this.primary,
                // 'storybook-button--secondary': !this.primary,
                // [`storybook-button--${this.size}`]: true,
            }
        },
        style() {
            return {
                backgroundColor: this.backgroundColor,
            }
        },
    },

    methods: {
        onClick() {
            this.$emit('onClick')
        },
    },
}
</script>
