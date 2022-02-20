<template>
    <div class="navbar bg-red-300" :class="containerStyles">
        <div class="navbar-header w-full h-1/8 flex items-center justify-between bg-green-400 p-4">
            <!-- <img class="object-contain h-full" :src="favicon" alt="favicon" /> -->
            <div class="navbar-header-left">
                <span class="title mx-4 text-xl min-w-max">Title</span>
            </div>

            <dn-icon-button @click="collapse"></dn-icon-button>
        </div>
        <div class="navbar-body w-full flex flex-col grow bg-green-500">
            <!-- <router-link v-for="(link, index) in links" :key="index" :to="link.to"> -->
            <button
                v-for="(link, index) in links"
                :key="index"
                class="uppercase font-bold focus:outline-none bg-green-500 rounded px-4 py-1 pt-1.5 mx-2 hover:bg-green-50 hover:text-green-500 transition text-center"
            >
                {{ link.name }}
            </button>
            <!-- </router-link> -->
        </div>
        <div class="navbar-footer w-full bg-green-600">Footer</div>
    </div>
</template>

<script>
import favicon from '@/assets/favicon.png'
import { ref, toRef, computed, watch } from 'vue'
import DnIconButton from '@ca/icon-button.vue'

export default {
    name: 'dn-navigation-drawer',
    components: {
        DnIconButton,
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
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
                // {
                //     name: 'arena',
                //     to: '/arena',
                // },
            ],
        }
    },
    setup(props, { emit }) {
        const baseLayoutStyles = [
            'flex flex-col justify-between items-center',
            'h-full',
            'rounded-r-lg overflow-hidden',
            'transition-[width] ease-in-out duration-500',
        ]

        const active = toRef(props, 'modelValue')
        const transitionStyles = computed(() => {
            return active.value ? ['w-11/12'] : ['w-0']
        })

        // watch(active, (newVal) => {
        //     emit('update:modelValue', newVal)
        // })

        const containerStyles = computed(() => {
            return [baseLayoutStyles, transitionStyles.value]
        })

        return {
            containerStyles,
            active,
        }
    },
    methods: {
        collapse() {
            console.log('collapse')
            this.$emit('update:modelValue', false)
            // this.active = false
        },
    },
}
</script>
