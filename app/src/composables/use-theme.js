//-- Libraries
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

//-- Composables
import useGradients from './use-gradients'

//-- Centralized data storage
const theme = useStorage('theme', 'ROYAL')

const { GRADIENTS } = useGradients({ hover: false })

const themeOptions = ref()
themeOptions.value = Object.entries(GRADIENTS).map((item) => {
    const label = _.upperFirst(_.lowerCase(item[0]))

    return {
        key: item[0],
        label,
        background: item[1],
    }
})

//-- Computed
const themeStyles = computed(() => {
    return GRADIENTS[theme.value]
})

//-- Methods
// Storage
const setActiveTheme = (key) => {
    theme.value = key
}

export default () => {
    return {
        theme,
        themeStyles,
        themeOptions,
        setActiveTheme,
    }
}
