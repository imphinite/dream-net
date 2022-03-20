<template>
    <div class="flex w-full justify-center">
        <div class="flex flex-col mt-16 w-4/5">
            <div
                class="font-display uppercase font-bold text-5xl text-gray-500"
            >
                Arena
            </div>

            <div
                class="flex w-full h-full p-4 border-2 border-gray-300 rounded-lg"
            >
                <!-- left container -->
                <div class="rounded-lg w-1/3 flex flex-col">
                    <card
                        v-for="(item, index) in cards"
                        :key="index"
                        :name="item.name"
                        :classname="item.classname"
                    />
                </div>

                <!-- right container -->
                <div class="rounded-lg w-2/3 flex flex-col">
                    <card
                        v-for="(item, index) in cards"
                        :key="index"
                        :name="item.name"
                        :classname="item.classname"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue'
import card from '@cm/card.vue'

export default {
    components: {
        card,
    },
    setup() {
        const cards = reactive([
            {
                name: 'Lowpixel',
                classname: 'Priest',
            },
            {
                name: 'Sylviamemeda',
                classname: 'Warlock',
            },
        ])

        return {
            cards,
        }
    },
}
</script>
