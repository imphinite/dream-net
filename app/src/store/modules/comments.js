//-- Libraries
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

//-- Store
import postModule from './posts'
import likeModule from './likes'
import favorModule from './favors'

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
    if (!postModule?.activePost?.value) {
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
    if (!data.value?.comments) {
        data.value.comments = {}
    }

    data.value.comments[commentData.id] = commentData
}

const updateComment = (commentData) => {
    if (!data.value?.comments?.[commentData.id]) {
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
    if (!postCommentRelationships.value?.[postId]) {
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

// Likes
const storeCommentCollectionLikes = (commentCollection) => {
    const likedComments = getLikedComments(commentCollection)
    const nonLikedComments = _.difference(
        commentCollection.map((comment) => comment.id),
        likedComments
    )

    nonLikedComments.forEach((id) => {
        likeModule.updateCommentLike({ commentId: id, like: false })
    })
    likedComments.forEach((id) => {
        likeModule.updateCommentLike({ commentId: id, like: true })
    })
}

const getLikedComments = (commentCollection) => {
    return commentCollection
        .filter((comment) => comment.liked)
        .map((comment) => comment.id)
}

// Favors
const storeCommentCollectionFavors = (commentCollection) => {
    const favoredComments = getFavoredComments(commentCollection)
    const nonFavoredComments = _.difference(
        commentCollection.map((comment) => comment.id),
        favoredComments
    )

    nonFavoredComments.forEach((id) => {
        favorModule.updateCommentFavor({ commentId: id, favor: false })
    })
    favoredComments.forEach((id) => {
        favorModule.updateCommentFavor({ commentId: id, favor: true })
    })
}

const getFavoredComments = (commentCollection) => {
    return commentCollection
        .filter((comment) => comment.favored)
        .map((comment) => comment.id)
}

//-- API
const axios = useAxios()
const fetchComments = async ({ postId, cursor }) => {
    const response = await axios({
        method: 'get',
        url: 'comments',
        params: {
            post_id: postId,
            cursor,
        },
    })

    // Store post data in storage
    storeCommentCollection(response.data)

    // Update post references
    storeCommentReferences({ commentCollectionData: response, postId })

    // Update comment like relationships
    storeCommentCollectionLikes(response.data)

    // Update comment favor relationships
    storeCommentCollectionFavors(response.data)
}

const saveComment = async ({ postId, body }) => {
    const response = await axios({
        method: 'post',
        url: 'comments',
        data: {
            post_id: postId,
            body,
        },
        globalLoading: true,
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
