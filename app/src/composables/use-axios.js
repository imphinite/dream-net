import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 10000,
})

export default () => {
    return instance
}
