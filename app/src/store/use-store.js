// store
import authModule from './modules/auth'
import userModule from './modules/users'
import postModule from './modules/posts'
import commentModule from './modules/comments'
import likeModule from './modules/likes'
import favorModule from './modules/favors'

export default () => {
    return {
        auth: authModule,
        users: userModule,
        posts: postModule,
        comments: commentModule,
        likes: likeModule,
        favors: favorModule,
    }
}
