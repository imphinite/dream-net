import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'
import useAxios from '@/composables/use-axios'
import _ from 'lodash'

//-- Centralized data storage
const data = useStorage('posts', {
    posts: {},
})

//-- Global data storage
const homeFeed = ref({
    posts: [],
    meta: {},
})

const myFeed = ref({
    posts: [],
    meta: {},
})

//-- Getters
const posts = computed(() => {
    return data.value.posts
})

const computedHomeFeed = computed(() => {
    return {
        posts: homeFeed.value.posts.map((postId) => {
            return data.value.posts[postId]
        }),
        meta: homeFeed.value.meta,
    }
})

const computedMyFeed = computed(() => {
    return {
        posts: myFeed.value.posts.map((postId) => {
            return data.value.posts[postId]
        }),
        meta: myFeed.value.meta,
    }
})

//-- Methods
// Storage
const storePost = (postData) => {
    // Init if not existing
    if (!Boolean(data.value?.posts)) {
        data.value.posts = {}
    }

    data.value.posts[postData.id] = postData
}

const updatePost = (postData) => {
    if (!Boolean(data.value?.posts?.[postData.id])) {
        storePost(postData)
    }

    data.value.posts[postData.id].title = postData.title
    data.value.posts[postData.id].body = postData.body
    data.value.posts[postData.id].mood = postData.mood
    data.value.posts[postData.id].locale = postData.locale
    data.value.posts[postData.id].moderation_flag = postData.moderation_flag
    data.value.posts[postData.id].anonymous = postData.anonymous
}

const storePostCollection = (postsData) => {
    postsData.forEach((postData) => {
        updatePost(postData)
    })
}

const clearPost = (postData) => {
    delete data.value.posts[postData.id]
}

const clearPostStorage = () => {
    delete data.value.posts
}

// Feeds
const savePostReferencesToHomeFeed = (feedData) => {
    homeFeed.value.posts = _.concat(
        homeFeed.value.posts,
        feedData.data.map((post) => post.id)
    )
    homeFeed.value.meta = feedData.meta
}
const savePostReferencesToMyFeed = (feedData) => {
    myFeed.value.posts = _.concat(
        myFeed.value.posts,
        feedData.data.map((post) => post.id)
    )
    myFeed.value.meta = feedData.meta
}

//-- API
const axios = useAxios()
const fetchHomeFeedPosts = async () => {
    const response = await axios({
        method: 'get',
        url: 'posts',
    })

    // Save post data in storage
    storePostCollection(response.data)

    // Update post references
    savePostReferencesToHomeFeed(response)
}

export default {
    data,
    posts,
    homeFeed: computedHomeFeed,
    myFeed: computedMyFeed,

    storePost,
    updatePost,
    storePostCollection,
    clearPost,
    clearPostStorage,

    // API
    fetchHomeFeedPosts,
}
