<template>
    <div class="bg-green-500 rounded">
        <div class="px-3 py-2 rounded-t-lg">
            <div class="font-bold text-xl text-gray-100 mb-2 mr-2">
                {{ name || 'Lowpixel' }}
            </div>
        </div>
        <div class="px-3 py-2 rounded-t-lg">
            <p class="text-gray-700 text-base">
                {{ description || 'Priest' }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'card-container',
    props: {},
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
