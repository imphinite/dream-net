import { ref, computed } from 'vue'

const loading = ref(false)

//-- Getter
const isLoading = computed(() => loading)

export default () => {
    return {
        loading,
        isLoading,
    }
}
