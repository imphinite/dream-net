<template>
    <article ref="page" :class="containerStyles">
        <dn-header
            v-if="header"
            :title="title"
            :interactions="interactions"
            @back-button-click="onBackButtonClick"
            @menu-button-click="$emit('toggle-navigation-drawer')"
            @title-click="$emit('reload')"
        />

        <section
            ref="swipeTarget"
            :style="{ left, opacity }"
            class="scrollbar-hidden"
            :class="bodySectionStyles"
        >
            <slot>
                <div
                    v-if="!isLoading"
                    class="flex flex-col justify-center items-center h-2/3"
                >
                    <div class="text-black text-md">
                        Oops! No content found..
                    </div>
                    <div class="text-sky-300 text-lg" @click="$emit('reload')">
                        Try refreshing?
                    </div>
                </div>
            </slot>
        </section>

        <dn-footer
            :current-page="route ? route.name : 'Home'"
            @home-button-click="pushRoute($event, { name: 'Home' })"
            @user-button-click="pushRoute($event, { name: 'My Dreams' })"
            @comment-button-click="pushRoute($event, { name: 'Notifications' })"
            @settings-button-click="pushRoute($event, { name: 'Settings' })"
            @plus-button-click="onPlusButtonClick"
        />
    </article>
</template>

<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
    width: 0 !important;
}
.scrollbar-hidden {
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
}
</style>

<script>
//-- Libraries
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSwipe, useElementSize, useInfiniteScroll } from '@vueuse/core'

//-- Components
import DnHeader from '@cm/header.vue'
import DnFooter from '@cm/footer.vue'

//-- Composables
import useTheme from '@/composables/use-theme'
import useLoading from '@/composables/use-loading'

export default {
    name: 'dn-page',
    components: { DnHeader, DnFooter },
    emits: [
        'toggle-navigation-drawer',
        'back-button-click',
        'plus-button-click',
        'swipe-end',
        'reload',
        'load-more',
    ],
    props: {
        swipable: {
            type: Boolean,
            default: false,
        },
        interactions: {
            type: Object,
            default: () => ({
                back: false,
                menu: true,
                plus: true,
            }),
        },
        header: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: 'DreamNet',
        },
    },
    setup(props, { emit }) {
        const route = useRoute()

        const CONTAINER_STYLES = [
            'relative',
            'flex flex-col',
            'w-screen h-screen overflow-hidden',
            // 'bg-white',
        ]

        const { themeStyles } = useTheme()
        const computedBgStyles = computed(() => {
            return [
                // 'bg-gradient-to-tr',
                themeStyles.value,
            ]
        })

        const containerStyles = computed(() => {
            return [CONTAINER_STYLES, computedBgStyles.value]
        })

        const BODY_SECTION_STYLES = [
            'absolute',
            'w-full h-[calc(100vh-3rem)] pt-12',
            'snap-y overflow-y-scroll scroll-smooth box-content scroll-py-14',
            // 'bg-black/25',
        ]

        const bodySectionStyles = computed(() => {
            return [BODY_SECTION_STYLES]
        })

        // Swipe
        const page = ref(null)
        const swipeTarget = ref(null)
        const { width: pageWidth } = useElementSize(swipeTarget)

        const left = ref('0')
        const opacity = ref(1)

        const { isSwiping, lengthX } = useSwipe(page, {
            onSwipe() {
                if (!props.swipable) return

                if (pageWidth.value) {
                    if (lengthX.value < 0) {
                        const length = Math.abs(lengthX.value)
                        left.value = `${length}px`
                        opacity.value = 1.1 - length / pageWidth.value
                    } else {
                        left.value = '0'
                        opacity.value = 1
                    }
                }
            },
            onSwipeEnd() {
                if (!props.swipable) return

                if (
                    lengthX.value < 0 &&
                    pageWidth.value &&
                    Math.abs(lengthX.value) / pageWidth.value >= 0.5
                ) {
                    left.value = '100%'
                    opacity.value = 0

                    emit('swipe-end')
                } else {
                    left.value = '0'
                    opacity.value = 1
                }
            },
        })

        const { isLoading } = useLoading()

        useInfiniteScroll(
            swipeTarget,
            () => {
                // load more
                emit('load-more')
            },
            { distance: 500 }
        )

        return {
            // refs
            page,
            swipeTarget,

            // styles
            containerStyles,
            bodySectionStyles,

            // swipe
            left,
            opacity,
            isSwiping,

            // loading
            isLoading,

            // routing
            route,
        }
    },
    methods: {
        onBackButtonClick() {
            this.$emit('back-button-click')
            if (this.$router) {
                this.$router.go(-1)
            }
        },
        onPlusButtonClick() {
            this.$emit('plus-button-click')
            if (this.$router) {
                this.$router.push({ name: 'Compose' })
            }
        },
        pushRoute(event, route) {
            if (this.$router) {
                this.$router.push(route)
            }
        },
    },
}
</script>
