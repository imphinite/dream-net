//-- Libraries
import _ from 'lodash'
import { ref } from 'vue'

//-- Composables
import useAxios from '@/composables/use-axios'

//-- Global data storage
// Likes on posts
const likedPosts = ref([])
// Likes on comments
const likedComments = ref([])

//-- Methods
const hasLikedPost = ({ postId }) => {
    return likedPosts.value.includes(postId)
}
const hasLikedComment = ({ commentId }) => {
    return likedComments.value.includes(commentId)
}

//-- Local storage
const updatePostLike = ({ postId, like }) => {
    if (like) {
        likedPosts.value.push(postId)
    } else {
        _.remove(likedPosts.value, (id) => {
            return id === postId
        })
    }
    likedPosts.value = _.uniq(likedPosts.value)
}

const updateCommentLike = ({ commentId, like }) => {
    if (like) {
        likedComments.value.push(commentId)
    } else {
        _.remove(likedComments.value, (id) => {
            return id === commentId
        })
    }
    likedComments.value = _.uniq(likedComments.value)
}

//-- API
const axios = useAxios()
const savePostLike = async ({ postId }) => {
    updatePostLike({ postId, like: true })

    try {
        await axios({
            method: 'post',
            url: 'like',
            data: {
                likeable_type: 'App\\Models\\Post',
                id: postId,
            },
            globalLoading: false,
        })
    } catch (error) {
        if (error.status === 403) {
            updatePostLike({ postId, favor: true })
        } else {
            updatePostLike({ postId, favor: false })
        }
    }

    return true
}
const deletePostLike = async ({ postId }) => {
    updatePostLike({ postId, like: false })

    try {
        await axios({
            method: 'delete',
            url: 'like',
            data: {
                likeable_type: 'App\\Models\\Post',
                id: postId,
            },
        })
    } catch (error) {
        if (error.status === 403) {
            updatePostLike({ postId, favor: false })
        } else {
            updatePostLike({ postId, favor: true })
        }
    }

    return true
}
const saveCommentLike = async ({ commentId }) => {
    updateCommentLike({ commentId, like: true })

    try {
        await axios({
            method: 'post',
            url: 'like',
            data: {
                likeable_type: 'App\\Models\\Comment',
                id: commentId,
            },
            globalLoading: false,
        })
    } catch (error) {
        if (error.status === 403) {
            updateCommentLike({ commentId, favor: true })
        } else {
            updateCommentLike({ commentId, favor: false })
        }
    }

    return true
}
const deleteCommentLike = async ({ commentId }) => {
    updateCommentLike({ commentId, like: false })

    try {
        await axios({
            method: 'delete',
            url: 'like',
            data: {
                likeable_type: 'App\\Models\\Comment',
                id: commentId,
            },
        })
    } catch (error) {
        if (error.status === 403) {
            updateCommentLike({ commentId, favor: false })
        } else {
            updateCommentLike({ commentId, favor: true })
        }
    }

    return true
}

export default {
    likedPosts,
    likedComments,

    hasLikedPost,
    hasLikedComment,

    // Local storage
    updatePostLike,
    updateCommentLike,

    // API
    savePostLike,
    saveCommentLike,
    deletePostLike,
    deleteCommentLike,
}
