import { ref } from 'vue'

//-- refs
const navDrawer = ref(false)
const activeItem = ref()

export default () => {
    return {
        navDrawer,
        activeItem,
    }
}
