// store
import authModule from './modules/auth'
import userModule from './modules/users'
import postModule from './modules/posts'
import commentModule from './modules/comments'

export default () => {
    return {
        auth: authModule,
        users: userModule,
        posts: postModule,
        comments: commentModule,
    }
}
