import axios from '../customizeApi'

export const loginAdmin = (email, password) => {
    return axios.post('/admin/login', { email, password })
}