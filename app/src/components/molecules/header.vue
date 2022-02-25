<template>
    <header
        class="relative flex w-full items-center justify-between p-2 z-10 backdrop-blur-md bg-gradient-to-b from-black/50 to-transparent"
    >
        <div class="flex h-full items-center">
            <dn-icon-button
                icon="bars"
                preset="transparent"
                @click="$emit('menu-button-click', $event)"
            />
        </div>
        <div
            class="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2"
        >
            <h1 class="text-white text-xl ml-2 font-bold">Dreamnet</h1>
        </div>
        <div>
            <!-- <dn-button
                size="small"
                @click="onLogout"
                label="Log out"
                v-if="user"
            />
            <dn-button
                size="small"
                @click="onLogin"
                label="Log in"
                v-if="!user"
            />
            <dn-button
                primary
                size="small"
                @click="onCreateAccount"
                label="Sign up"
                v-if="!user"
            /> -->
        </div>
    </header>
</template>

<script>
import DnButton from '@ca/button.vue'
import DnIconButton from '@ca/icon-button.vue'

export default {
    name: 'dn-header',
    components: { DnButton, DnIconButton },
    emits: ['menu-button-click'],
    props: {
        user: {
            type: Object,
        },
    },
    methods: {},
}
</script>
