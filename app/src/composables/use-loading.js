import { ref, computed } from 'vue'

const loading = ref(false)

//-- Getter
const isLoading = computed(() => loading.value)

export default () => {
    return {
        loading,
        isLoading,
    }
}
