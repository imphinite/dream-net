//-- Libraries
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

//-- Store
import postModule from './posts'

//-- Composables
import useAxios from '@/composables/use-axios'

//-- Centralized data storage
const data = useStorage('comments', {
    comments: {},
})

//-- Global data storage
// post-comment relationships, e.g.
// postId: {
//     comments: [commentId, commentId, commentId],
//     meta: {},
// }
const postCommentRelationships = ref({})

//-- Getters
const comments = computed(() => {
    return data.value.comments
})

const computedActivePostComments = computed(() => {
    if (!Boolean(postModule?.activePost?.value)) {
        return {
            comments: [],
            meta: {},
        }
    }

    return {
        comments: postCommentRelationships.value?.[
            postModule.activePost.value?.id
        ]?.comments?.map((commentId) => {
            return data.value.comments[commentId]
        }),
        meta: postCommentRelationships.value?.[postModule.activePost.value?.id]
            ?.meta,
    }
})

//-- Methods
// Storage
const storeComment = (commentData) => {
    // Init if not existing
    if (!Boolean(data.value?.comments)) {
        data.value.comments = {}
    }

    data.value.comments[commentData.id] = commentData
}

const updateComment = (commentData) => {
    if (!Boolean(data.value?.comments?.[commentData.id])) {
        storeComment(commentData)
    }

    const { id, body, moderationFlag, anonymous } = commentData

    data.value.comments[id].body = body
    data.value.comments[id].moderationFlag = moderationFlag
    data.value.comments[id].anonymous = anonymous
}

const storeCommentCollection = (commentCollectionData) => {
    commentCollectionData.forEach((commentData) => {
        updateComment(commentData)
    })
}

const clearComment = (commentData) => {
    delete data.value.comments[commentData.id]
}

const clearCommentStorage = () => {
    delete data.value.comments
    delete data.value.relationships
}

// Feeds
const storeCommentReferences = ({ commentCollectionData, postId }) => {
    // Initialize relationship if non-existing on the client side
    if (!Boolean(postCommentRelationships.value?.[postId])) {
        postCommentRelationships.value[postId] = {
            // Comment Id collection
            comments: [],
            // Pagination
            meta: {},
        }
    }

    postCommentRelationships.value[postId].comments = _.uniq(
        _.concat(
            postCommentRelationships.value[postId].comments,
            commentCollectionData.data.map((comment) => comment.id)
        )
    )
    postCommentRelationships.value[postId].meta = commentCollectionData.meta
}

//-- API
const axios = useAxios()
const fetchComments = async ({ postId }) => {
    const response = await axios({
        method: 'get',
        url: 'comments',
        params: {
            post_id: postId,
        },
    })

    // Store post data in storage
    storeCommentCollection(response.data)

    // Update post references
    storeCommentReferences({ commentCollectionData: response, postId })
}

const saveComment = async ({ postId, body }) => {
    const response = await axios({
        method: 'post',
        url: 'comments',
        data: {
            post_id: postId,
            body,
        },
    })

    // Store comment data in storage
    storeComment(response.data)

    // Prepend this comment's id to the post comment thread
    postCommentRelationships.value[postId].comments.unshift(response.data.id)

    return response.data
}

export default {
    data,
    comments,
    activePostComments: computedActivePostComments,

    // Local storage
    storeComment,
    updateComment,
    storeCommentCollection,
    clearComment,
    clearCommentStorage,

    // API
    fetchComments,
    saveComment,
}
