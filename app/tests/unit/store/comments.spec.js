import postModule from '@/store/modules/posts'
import commentModule, { storeCommentReferences } from '@/store/modules/comments'

describe('comment module', () => {
    const {
        data,
        comments,
        activePostComments,

        // Local storage
        storeComment,
        updateComment,
        storeCommentCollection,
        clearComment,
        clearCommentStorage,

        // API
        fetchComments,
        saveComment,
    } = commentModule

    const mockComment = {
        id: 1,
        body: 'body',
    }

    beforeEach(() => {
        postModule.clearPostStorage()
        clearCommentStorage()
    })

    it('data', () => {
        expect(data.value).toEqual({})
    })

    it('comments', () => {
        storeComment(mockComment)
        expect(comments.value).toEqual({ 1: mockComment })
    })

    it('activePostComments', () => {
        expect(activePostComments.value).toEqual({ comments: [], meta: {} })

        postModule.data.value.posts = {
            1: {
                id: '1',
                title: 'post_title',
                content: 'post_content',
            },
        }
        postModule.setActivePost({ postId: 1 })
        storeComment(mockComment)
        storeCommentReferences({
            commentCollectionData: {
                data: [mockComment],
                meta: {},
            },
            postId: 1,
        })
        expect(activePostComments.value).toEqual({
            comments: [mockComment],
            meta: {},
        })
    })

    it('storeComment', () => {
        storeComment(mockComment)
        expect(data.value.comments[1]).toEqual(mockComment)
        expect(Object.keys(data.value.comments).includes('1')).toBeTruthy()
    })

    it('updateComment', () => {
        const mockUpdatedCommment = {
            ...mockComment,
            moderationFlag: 1,
            anonymous: false,
        }
        updateComment(mockUpdatedCommment)
        expect(data.value.comments[1]).toEqual(mockUpdatedCommment)

        updateComment({ ...mockUpdatedCommment, anonymous: true })
        expect(data.value.comments[1].anonymous).toBe(true)
    })

    it('storeCommentCollection', async () => {
        storeCommentCollection([mockComment, { ...mockComment, id: 2 }])
        expect(data.value.comments[1]).toEqual(mockComment)
        expect(data.value.comments[2].id).toBe(2)
    })

    it('clearComment', async () => {
        storeComment(mockComment)
        expect(data.value.comments[1]).toEqual(mockComment)

        clearComment(mockComment)
        expect(Object.keys(data.value.comments).includes('1')).toBe(false)
    })

    // it('storeCommentCollectionLikes', async () => {
    //     storeCommentCollectionLikes([
    //         mockComment,
    //         { ...mockComment, id: 2, liked: true },
    //     ])

    //     expect(data.value.user).toEqual(mockUser)
    // })
})
