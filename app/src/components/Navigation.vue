<template>
    <div
        class="
            navigation-bar
            w-screen
            bg-gray-900
            h-24
            flex
            items-center
            justify-between
            text-white
            font-bold font-display
            px-16
        "
    >
        <div class="h-1/2 flex items-center">
            <img class="object-contain h-full" :src="favicon" alt="favicon" />
            <span class="title mx-4 text-xl min-w-max">Vue Next</span>
        </div>
        <div class="button-group flex">
            <router-link v-for="(link, index) in links" :key="index" :to="link.to">
                <button
                    class="
                        uppercase
                        font-bold
                        focus:outline-none
                        bg-green-500
                        rounded
                        px-4
                        py-1
                        pt-1.5
                        mx-2
                        hover:bg-green-50
                        hover:text-green-500
                        transition
                        text-center
                    "
                >
                    {{ link.name }}
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import favicon from '@/assets/favicon.png'

export default {
    data() {
        return {
            favicon: favicon,
            links: [
                {
                    name: 'home',
                    to: '/',
                },
                {
                    name: 'about',
                    to: '/about',
                },
                {
                    name: 'tailwind',
                    to: '/tailwind',
                },
            ],
        }
    },
}
</script>
