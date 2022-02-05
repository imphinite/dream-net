<template>
    <div class="bg-green-500 rounded m-2">
        <div class="px-3 py-2 rounded-t-lg">
            <div class="font-bold text-xl text-gray-100 mb-2 mr-2">
                {{ name || 'name' }}
            </div>
        </div>
        <div class="px-3 py-2 rounded-t-lg">
            <p class="text-gray-700 text-base">
                {{ classname || 'class' }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card',
    props: {
        name: String,
        classname: String,
    },
    setup(props) {},
    methods: {
        onClick() {
            /**
             * Click event
             *
             * @event click
             */
            this.$emit('click')
        },
    },
}
</script>
