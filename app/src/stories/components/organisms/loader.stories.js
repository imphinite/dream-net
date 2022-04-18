import useActionEvents from '@sb/utils/use-action-events.js'
import DnLoader from '@co/loader.vue'
import { ref } from 'vue'

export default {
    title: 'Organisms/Loader',
    component: DnLoader,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        // modelValue: {
        //     table: { disable: true },
        // },
        'update:modelValue': {
            table: { disable: true },
        },
        default: {
            table: { disable: true },
        },
    },
}

const Template = (args, { argTypes }) => ({
    props: Object.keys(DnLoader),
    components: { DnLoader },
    setup() {
        const active = ref(args.modelValue)
        // active.value =

        return {
            args,
            ...useActionEvents(argTypes),
            active,
        }
    },
    template: `
        <div class="w-full h-full">
            <dn-loader
                v-bind="args"
                v-on="actionEvents"
                v-model="active"
            />
        </div>
    `,
})

export const Default = Template.bind({})
Default.args = {}
