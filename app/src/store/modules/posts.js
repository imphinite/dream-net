//-- Libraries
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

//-- Store
import likeModule from './likes'
import favorModule from './favors'

//-- Composables
import useAxios from '@/composables/use-axios'

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

// Id reference of a post
const activePost = ref(null)

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

const computedActivePost = computed(() => {
    return data.value.posts[activePost.value] || {}
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

    data.value.posts[postData.id] = postData
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
const storePostReferencesToHomeFeed = (feedData) => {
    homeFeed.value.posts = _.uniq(
        _.concat(
            homeFeed.value.posts,
            feedData.data.map((post) => post.id)
        )
    )
    homeFeed.value.meta = feedData.meta
}
const storePostReferencesToMyFeed = (feedData) => {
    myFeed.value.posts = _.concat(
        myFeed.value.posts,
        feedData.data.map((post) => post.id)
    )
    myFeed.value.meta = feedData.meta
}

// Post
const setActivePost = ({ postId }) => {
    activePost.value = postId
}

// Likes
const storePostCollectionLikes = (postCollection) => {
    const likedPosts = getLikedPosts(postCollection)

    const nonLikedPosts = _.difference(
        postCollection.map((post) => post.id),
        likedPosts
    )

    nonLikedPosts.forEach((id) => {
        likeModule.updatePostLike({ postId: id, like: false })
    })
    likedPosts.forEach((id) => {
        likeModule.updatePostLike({ postId: id, like: true })
    })
}

const getLikedPosts = (postCollection) => {
    return postCollection.filter((post) => post.liked).map((post) => post.id)
}

// Favors
const storePostCollectionFavors = (postCollection) => {
    const favoredPosts = getFavoredPosts(postCollection)
    const nonFavoredPosts = _.difference(
        postCollection.map((post) => post.id),
        favoredPosts
    )

    nonFavoredPosts.forEach((id) => {
        favorModule.updatePostFavor({ postId: id, favor: false })
    })
    favoredPosts.forEach((id) => {
        favorModule.updatePostFavor({ postId: id, favor: true })
    })
}

const getFavoredPosts = (postCollection) => {
    return postCollection.filter((post) => post.favored).map((post) => post.id)
}

//-- API
const axios = useAxios()
const fetchHomeFeedPosts = async () => {
    const response = await axios({
        method: 'get',
        url: 'posts',
        globalLoading: true,
    })

    // Store post data in storage
    storePostCollection(response.data)

    // Update post references
    storePostReferencesToHomeFeed(response)

    // Update post like relationships
    storePostCollectionLikes(response.data)

    // Update post favor relationships
    storePostCollectionFavors(response.data)
}

const fetchPost = async ({ postId }) => {
    const response = await axios({
        method: 'get',
        url: `posts/${postId}`,
        globalLoading: false,
    })

    updatePost(response.data)

    likeModule.updatePostLike({
        postId: response.data.id,
        like: response.data.liked,
    })
    favorModule.updatePostFavor({
        postId: response.data.id,
        favor: response.data.favored,
    })
}

const savePost = async ({ title, body, mood, anonymous }) => {
    const response = await axios({
        method: 'post',
        url: 'posts',
        data: {
            title,
            body,
            mood,
            anonymous,
        },
        globalLoading: true,
    })

    // Store post data in storage
    storePost(response.data)

    // Prepend this post's id to Home feed (TODO: and My feed)
    homeFeed.value.posts.unshift(response.data.id)

    return response.data
}

export default {
    data,
    posts,
    homeFeed: computedHomeFeed,
    myFeed: computedMyFeed,
    activePost: computedActivePost,

    // Local storage
    storePost,
    updatePost,
    storePostCollection,
    clearPost,
    clearPostStorage,
    setActivePost,

    // API
    fetchHomeFeedPosts,
    fetchPost,
    savePost,
}
