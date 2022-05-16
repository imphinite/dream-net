import useAxios from '@/composables/use-axios'
import moxios from 'moxios'
import likeModule from '@/store/modules/likes'

describe('like module', () => {
    const {
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
    } = likeModule
    let axiosInstance

    beforeEach(() => {
        // import and pass your custom axios instance to this method
        axiosInstance = useAxios()
        moxios.install(axiosInstance)

        likedPosts.value = []
        likedComments.value = []
    })

    afterEach(() => {
        // import and pass your custom axios instance to this method
        moxios.uninstall(axiosInstance)
    })

    it('hasLikedPost', () => {
        likedPosts.value = [1]

        expect(hasLikedPost({ postId: 1 })).toBeTruthy()
        expect(hasLikedPost({ postId: 2 })).toBeFalsy()
    })

    it('hasLikedComment', () => {
        likedComments.value = [1]

        expect(hasLikedComment({ commentId: 1 })).toBeTruthy()
        expect(hasLikedComment({ commentId: 2 })).toBeFalsy()
    })

    it('updatePostLike', () => {
        updatePostLike({ postId: 1, like: true })
        expect(likedPosts.value).toEqual([1])

        updatePostLike({ postId: 1, like: false })
        expect(likedPosts.value).toEqual([])
    })

    it('updateCommentLike', () => {
        updateCommentLike({ commentId: 1, like: true })
        expect(likedComments.value).toEqual([1])

        updateCommentLike({ commentId: 1, like: false })
        expect(likedComments.value).toEqual([])
    })

    it.skip('savePostLike', async () => {
        moxios.stubRequest('like', {
            status: 200,
            response: {},
        })

        await savePostLike({ postId: 1 })
        expect(likedPosts.value).toEqual([1])
    })

    it.skip('deletePostLike', async () => {
        moxios.stubRequest('like', {
            status: 200,
            response: {},
        })

        await deletePostLike({ postId: 1 })
        expect(likedPosts.value).toEqual([])
    })
})
