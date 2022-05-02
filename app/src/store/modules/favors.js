//-- Libraries
import _ from 'lodash'
import { ref } from 'vue'

//-- Composables
import useAxios from '@/composables/use-axios'

//-- Global data storage
// Favors on posts
const favoredPosts = ref([])
// Favors on comments
const favoredComments = ref([])

//-- Methods
const hasFavoredPost = ({ postId }) => {
    return favoredPosts.value.includes(postId)
}
const hasFavoredComment = ({ commentId }) => {
    return favoredComments.value.includes(commentId)
}

//-- Local storage
const updatePostFavor = ({ postId, favor }) => {
    if (favor) {
        favoredPosts.value.push(postId)
    } else {
        _.remove(favoredPosts.value, (id) => {
            return id === postId
        })
    }
    favoredPosts.value = _.uniq(favoredPosts.value)
}

const updateCommentFavor = ({ commentId, favor }) => {
    if (favor) {
        favoredComments.value.push(commentId)
    } else {
        _.remove(favoredComments.value, (id) => {
            return id === commentId
        })
    }
    favoredComments.value = _.uniq(favoredComments.value)
}

//-- API
const axios = useAxios()
const savePostFavor = async ({ postId }) => {
    updatePostFavor({ postId, favor: true })

    try {
        await axios({
            method: 'post',
            url: 'favor',
            data: {
                favorable_type: 'App\\Models\\Post',
                id: postId,
            },
            globalLoading: false,
        })
    } catch (error) {
        updatePostFavor({ postId, favor: false })
    }

    return true
}
const deletePostFavor = async ({ postId }) => {
    updatePostFavor({ postId, favor: false })

    try {
        await axios({
            method: 'delete',
            url: 'favor',
            data: {
                favorable_type: 'App\\Models\\Post',
                id: postId,
            },
        })
    } catch (error) {
        updatePostFavor({ postId, favor: true })
    }

    return true
}
const saveCommentFavor = async ({ commentId }) => {
    updateCommentFavor({ commentId, favor: true })

    try {
        await axios({
            method: 'post',
            url: 'favor',
            data: {
                favorable_type: 'App\\Models\\Comment',
                id: commentId,
            },
            globalLoading: false,
        })
    } catch (error) {
        updateCommentFavor({ commentId, favor: false })
    }

    return true
}
const deleteCommentFavor = async ({ commentId }) => {
    updateCommentFavor({ commentId, favor: false })

    try {
        await axios({
            method: 'delete',
            url: 'favor',
            data: {
                favorable_type: 'App\\Models\\Comment',
                id: commentId,
            },
        })
    } catch (error) {
        updateCommentFavor({ commentId, favor: true })
    }

    return true
}

export default {
    favoredPosts,
    favoredComments,

    hasFavoredPost,
    hasFavoredComment,

    // Local storage
    updatePostFavor,
    updateCommentFavor,

    // API
    savePostFavor,
    saveCommentFavor,
    deletePostFavor,
    deleteCommentFavor,
}
