<template>
    <div id="app">
        <navigation-bar />
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationBar from '@/components/navigation.vue'

export default {
    components: { NavigationBar },
}
</script>
