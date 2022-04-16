import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const navDrawer = ref(false)
const navigationMenuItems = ref()

// Generate navigation menu items from router config
const ROUTE_ICON_MAPPING = {
    Home: 'home',
    Favorites: 'star',
    History: 'book',
    Settings: 'gear',
    Logout: 'user',
}

export default () => {
    const router = useRouter()

    navigationMenuItems.value = router.options.routes
        .filter((route) => route.name !== 'Auth')
        .map((route) => {
            return {
                label: route.name,
                icon: ROUTE_ICON_MAPPING[route.name],
            }
        })

    // Initialize active menu item
    const activeItem = ref()
    watch(activeItem, (newActiveItem) => {
        navDrawer.value = false

        router.push({ name: newActiveItem.label })
    })

    return {
        navDrawer,
        navigationMenuItems,
        activeItem,
    }
}
